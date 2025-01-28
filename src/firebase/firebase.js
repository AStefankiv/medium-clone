import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAAgntNyJbjmCV3zjThideKoBDDHa8CfCE",
  authDomain: "medium-42770.firebaseapp.com",
  projectId: "medium-42770",
  storageBucket: "medium-42770.firebasestorage.app",
  messagingSenderId: "537432516476",
  appId: "1:537432516476:web:5e04959137f2fff78326f9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default { db, auth };