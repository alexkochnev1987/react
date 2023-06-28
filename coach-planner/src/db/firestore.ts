import {
  CollectionReference,
  type DocumentData,
  DocumentReference,
  Timestamp,
  addDoc,
  deleteDoc,
  serverTimestamp,
  updateDoc,
  getDoc,
} from 'firebase/firestore';

export const addDocFunction = async (collection: CollectionReference<DocumentData>, args: any) => {
  try {
    await addDoc(collection, {
      ...args,
      create: Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateDocFunction = async (docRef: DocumentReference<DocumentData>, args: any) => {
  try {
    await updateDoc(docRef, {
      ...args,
      modify: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteDocFunction = async (docRef: DocumentReference<DocumentData>) => {
  try {
    await deleteDoc(docRef);
  } catch (error) {
    console.error(error);
  }
};

export const getDocFunction = async (docRef: DocumentReference<DocumentData>) => {
  try {
    const result = await getDoc(docRef);
    return result;
  } catch (error) {
    console.error(error);
  }
};
