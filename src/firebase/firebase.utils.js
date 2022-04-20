// import firebase from 'firebase/compat/app'
// import 'firebase/compat/firestore'
// import 'firebase/compat/auth'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBIhMr3D2FueJE7Ol66vWgcgvTha1VUdSw',
  authDomain: 'ini-clothing-db.firebaseapp.com',
  projectId: 'ini-clothing-db',
  storageBucket: 'ini-clothing-db.appspot.com',
  messagingSenderId: '978373102508',
  appId: '1:978373102508:web:91de1b4f2f67a7cb820809',
  measurementId: 'G-VKYGDSH4Z6',
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const createUser = async (user, otherInfo) => {
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  const userSnapshot = await getDoc();

  if (userSnapshot.exists()) return userRef;

  const { displayName, email } = user;
  const createdAt = new Date();

  try {
    await setDoc(userRef, {
      displayName,
      email,
      createdAt,
      ...otherInfo,
    });
  } catch (err) {
    console.log('Error: creating user - ', err.message);
  }

  return userRef;
};
