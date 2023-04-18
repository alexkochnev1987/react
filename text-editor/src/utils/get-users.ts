import axios from 'axios';
import { arrToArrString } from './arr-num-to-string';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const url = 'https://jsonplaceholder.typicode.com/users';

export const getData = async () => {
  try {
    const { data } = await axios.get<User[]>(url);
    return arrToArrString(data.map((user) => user.id));
  } catch (error) {
    console.log(error);
  }
};

export const loadUsers = async () => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
};
