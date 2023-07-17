import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage, userId } from '../firebase';
import { DbCollections } from './constants';
import { type DocumentData, DocumentSnapshot, collection, doc } from 'firebase/firestore';
import { setDocFunction, updateDocFunction } from './firestore';

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
export const getUserCollection = () => collection(db, DbCollections.users).withConverter(userConverter);
export const getUserDocRef = (userUiid: string) => doc(getUserCollection(), userUiid).withConverter(userConverter);
export const setUser = (userUiid: string, data: Partial<CustomUser>) => {
  setDocFunction(getUserDocRef(userUiid), data);
};

export const updateUser = async (userUiid: string, data: Partial<UserData>) => {
  await updateDocFunction(getUserDocRef(userUiid), { ...data });
};

export const uploadImg = async (file: File) => {
  const link = `${localStorage.getItem(userId)}/myPhoto`;
  const fileRef = ref(storage, link);
  const result = await uploadBytes(fileRef, file);
  const url = await getDownloadURL(result.ref);
  return url;
};

export const loadFileSetLink = async (userUiid: string, user: CustomUser | undefined, image: File) => {
  const img = await uploadImg(image);
  if (user) {
    await updateUser(userUiid, { img });
  } else {
    await setUser(userUiid, { img });
  }
};
