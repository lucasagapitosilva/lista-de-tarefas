import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDLQyDWtIlYg1MEgz58sVK4oomFy_a59DQ",
    authDomain: "modulo24aula12-projetolista.firebaseapp.com",
    projectId: "modulo24aula12-projetolista",
    storageBucket: "modulo24aula12-projetolista.appspot.com",
    messagingSenderId: "810828940537",
    appId: "1:810828940537:web:148c388666d1076b3b8e28",
    measurementId: "G-9L1KK26368"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };