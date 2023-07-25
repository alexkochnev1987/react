import { DbCollections } from '../../db/constants';
import { deleteObject, getStorageRef, getUserUiid } from './firebase.lib';

export const getInitPath = () => {
  const userUiid = getUserUiid();
  return `${DbCollections.users}/${userUiid}/`;
};

export const deleteImage = async (id: string) => {
  const userUiid = getUserUiid();
  const link = `${userUiid}/${id}`;
  const fileRef = getStorageRef(link);
  try {
    await deleteObject(fileRef);
  } catch (error) {
    throw error;
  }
};

// export const addDocFunction = async (
//   collection: CollectionReference<DocumentData>,
//   args: { [key: string]: string | number },
// ): Promise<DocumentReference<DocumentData>> => {
//   try {
//     const result = await addDoc(collection, {
//       ...args,
//       create:serverTimestamp(),
//     });
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };

// export const setDocFunction = async (
//   collection: DocumentReference<DocumentData>,
//   args: { [key: string]: string | number },
// ) => {
//   try {
//     const result = await setDoc(collection, {
//       ...args,
//       create: serverTimestamp(),
//     });
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateDocFunction = async (
//   docRef: DocumentReference<DocumentData>,
//   args:
//     | {
//         [key: string]: string | number | string[];
//       }
//     | Partial<UpdateExerciseBody>,
// ) => {
//   try {
//     await updateDoc(docRef, {
//       ...args,
//       modify: serverTimestamp(),
//     });
//   } catch (error) {
//     throw error;
//   }
// };

// export const getDocFunction = async (docRef: DocumentReference<DocumentData>) => {
//   try {
//     const result = await getDoc(docRef);
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getDocsFunction = async (collection: CollectionReference<DocumentData>) => {
//   try {
//     const result = await getDocs(collection);
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };
