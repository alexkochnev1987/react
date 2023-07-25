import { DocumentData, DocumentSnapshot, Timestamp } from '@/lib/firebase/firebase.lib';
import { DbCollections } from '../db/constants';
import { UserRepo, setUser, updateUser, uploadUserImg } from '@/repository/user';

export interface UserData {
  img: string;
  name: string;
  age: number;
  team: string;
  surName: string;
  birthDay: Timestamp | null;
}

export class CustomUser {
  img: string;
  name: string;
  age: number;
  team: string;
  surName: string;
  birthDay: Timestamp | null;
  constructor({ img, name, age, team, surName, birthDay }: Partial<UserData>) {
    this.img = img || '';
    this.name = name || '';
    this.age = age || 18;
    this.team = team || '';
    this.surName = surName || '';
    this.birthDay = birthDay || null;
  }
}

export const userConverter = {
  toFirestore: (user: CustomUser) => {
    return {
      img: user.img || '',
      name: user.name || '',
      age: user.age || '',
      team: user.team || '',
      surName: user.surName || '',
      birthDay: user.birthDay || null,
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot<DocumentData>) => {
    const data = snapshot.data() as CustomUser;
    return new CustomUser(data);
  },
};

export const getUserEmail = () => UserRepo.getUserEmail();

export const loadFileSetLink = async (user: CustomUser | undefined, image: File) => {
  const img = await uploadUserImg(image);
  if (user) {
    await updateUser({ img });
  } else {
    await setUser({ img });
  }
};
