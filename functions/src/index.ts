import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

admin.initializeApp();

export const uploadImages = functions.https.onRequest(async (req: Request, res: Response): Promise<void> => {
  if (req.method !== 'POST') {
    res.status(405).send('Método não permitido.'); 
    return;
  }

  
  const { images, messageId } = req.body;

  if (!images || !messageId) {
    res.status(400).send('Imagens ou ID da mensagem não fornecidos.'); 
    return;
  }

  try {
    const imageUrls: string[] = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      if (!image.startsWith('data:image/')) {
        res.status(400).send('Formato de imagem inválido.');
        return;
      }

      const imageBuffer = Buffer.from(image.split(',')[1], 'base64'); 

      const fileName = `images/${Date.now()}_${i}.jpg`;
      const bucket = admin.storage().bucket();
      const file = bucket.file(fileName);

      await file.save(imageBuffer, { contentType: 'image/jpeg' });

     
      const [imageUrl] = await file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491',
      });

      imageUrls.push(imageUrl);
    }

   
    await admin.firestore().collection('messages').doc(messageId).update({
      images: imageUrls,
    });

    res.status(200).send('Imagens enviadas com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar imagens:', error);
    res.status(500).send('Erro no envio das imagens');
  }
});
