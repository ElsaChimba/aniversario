import { db } from './firebaseConfig'; 
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';

export const addUser = async (primeiroNome: string, ultimoNome: string, opcao: string) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      primeiroNome,
      ultimoNome,
      opcao,
    });
    return docRef.id; 
  } catch (error) {
    console.error('Erro ao adicionar usuário', error);
    throw new Error('Erro ao adicionar usuário');
  }
};


export const getUserData = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    throw new Error('Usuário não encontrado!');
  }

  const userData = userSnapshot.data();
  return userData;
};
