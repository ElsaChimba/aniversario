import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export async function addMessage(userId: string, message: string) {
  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      userId,
      message,
      createdAt: new Date()
    });
    console.log("Message added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding message: ", e);
  }
}
