import axios from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { User } from '../../../utils/get-users';
import { decrement, increment, setUsers } from '../../counter-slice';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export function* incrementWorker() {
  yield delay(1000);
  yield put(increment());
}

export function* decrementWorker() {
  yield delay(1000);
  yield put(decrement());
}

const getUsers = () => {
  return axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
};

function* fetchUsersFromApi() {
  const { data }: { data: User[] } = yield call(getUsers);
  yield put(setUsers(data));
}

function* countWatcher() {
  yield takeEvery('INCREMENT_ASYNC', incrementWorker);
  yield takeEvery('DECREMENT_ASYNC', decrementWorker);
}

function* userWatcher() {
  yield takeEvery('FETCH_USERS', fetchUsersFromApi);
}
export function* rootWatcher() {
  yield all([userWatcher(), countWatcher()]);
}
