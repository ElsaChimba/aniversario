import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCZ0jrGQMcIvn4Jihx2Srmljlv9DtcaFz4",
    authDomain: "my-birthday-ef3ac.firebaseapp.com",
    projectId: "my-birthday-ef3ac",
    databaseURL: "https://my-birthday-ef3ac-default-rtdb.firebaseio.com",
    storageBucket: "my-birthday-ef3ac.firebasestorage.app",
    messagingSenderId: "578105445680",
    appId: "1:578105445680:web:b59662987216a1d5c60cf5",
    measurementId: "G-659L9JCH7G"
}

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { db, auth, firestore, storage };
