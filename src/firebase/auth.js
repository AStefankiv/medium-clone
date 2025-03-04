import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';


export const signUp = async (email, password, isAdmin = false) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: isAdmin ? 'admin' : 'user',
    });
    
    console.log('User signed up:', user);
    return userCredential;
  } catch (error) {
    console.error('Error signing up:', error.message);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);
      return userCredential;
  } catch (error) {
    console.error('Error signing in:', error.message);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', error.message);
    throw error;
  }
};