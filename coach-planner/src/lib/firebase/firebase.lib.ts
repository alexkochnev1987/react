import { initializeApp } from 'firebase/app';
import {
  CollectionReference,
  DocumentData,
  collection,
  doc,
  getFirestore,
} from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { DbCollections } from '@/db/constants';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = (() => {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw Error('No Firebase configuration object provided');
  }
  return initializeApp(firebaseConfig);
})();

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export const getCollectionRef = (path: string) => collection(db, path);
export const getDocRef = (collection: CollectionReference<DocumentData>, id: string) =>
  doc(collection, id);
export const getStorageRef = (link: string) => ref(storage, link);
export { deleteObject, getDownloadURL, uploadBytes } from 'firebase/storage';
export const getUserUiid = () => {
  const userUiid = auth.currentUser?.uid;
  if (!userUiid) throw new Error('User not found');
  return userUiid;
};
export const getUserData = () => {
  return auth.currentUser;
};

export const getInitPath = () => {
  const userUiid = getUserUiid();
  return `${DbCollections.users}/${userUiid}/`;
};

export {
  CollectionReference,
  type DocumentData,
  DocumentReference,
  Timestamp,
  DocumentSnapshot,
  addDoc,
  deleteDoc,
  serverTimestamp,
  updateDoc,
  getDoc,
  setDoc,
  getDocs,
  QueryDocumentSnapshot,
  query,
  where,
} from 'firebase/firestore';

export { FirebaseError } from 'firebase/app';
