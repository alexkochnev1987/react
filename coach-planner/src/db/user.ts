import {
  getCollectionRef,
  getDocRef,
  getDownloadURL,
  getStorageRef,
  getUserUiid,
  uploadBytes,
  setDoc,
  updateDoc,
  DocumentData,
  DocumentSnapshot,
} from '@/lib/firebase/firebase.lib';
import { DbCollections } from './constants';

export interface UserData {
  img: string;
  name: string;
  age: number;
  team: string;
  surName: string;
}

export class CustomUser {
  img: string;
  name: string;
  age: number;
  team: string;
  surName: string;
  constructor({ img, name, age, team, surName }: Partial<UserData>) {
    this.img = img || '';
    this.name = name || '';
    this.age = age || 18;
    this.team = team || '';
    this.surName = surName || '';
  }
}

const userConverter = {
  toFirestore: (user: CustomUser) => {
    return {
      img: user.img || '',
      name: user.name || '',
      age: user.age || '',
      team: user.team || '',
      surName: user.surName || '',
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot<DocumentData>) => {
    const data = snapshot.data() as CustomUser;
    return new CustomUser(data);
  },
};
export const getUserCollection = () =>
  getCollectionRef(DbCollections.users).withConverter(userConverter);
export const getUserDocRef = () =>
  getDocRef(getUserCollection(), getUserUiid()).withConverter(userConverter);
export const setUser = (data: Partial<CustomUser>) => {
  setDoc(getUserDocRef(), data);
};

export const updateUser = async (data: Partial<UserData>) => {
  await updateDoc(getUserDocRef(), data);
};

export const uploadUserImg = async (file: File) => {
  const userUiid = getUserUiid();
  const link = `${userUiid}//myPhoto`;
  const fileRef = getStorageRef(link);
  const result = await uploadBytes(fileRef, file);
  const url = await getDownloadURL(result.ref);
  return url;
};

export const loadFileSetLink = async (user: CustomUser | undefined, image: File) => {
  const img = await uploadUserImg(image);
  if (user) {
    await updateUser({ img });
  } else {
    await setUser({ img });
  }
};
