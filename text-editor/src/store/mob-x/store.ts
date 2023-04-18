import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { BASE_URL } from '../../constants/namings';
import { AuthResponse } from '../..//models/response/auth-response';
import { IUser } from '../../models/iuser';
import { AuthService } from '../../services/auth-service';

export default class MobxStore {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;
  constructor() {
    makeAutoObservable(this);
  }

  setAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  async registration(email: string, password: string, username: string) {
    this.setLoading(true);
    try {
      const { data } = await AuthService.registration(email, password, username);
      localStorage.setItem('token', data.accessToken);
      this.setAuth(true);
      this.setUser(data);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

  async login(email: string, password: string) {
    this.setLoading(true);
    try {
      const { data } = await AuthService.login(email, password);
      localStorage.setItem('token', data.accessToken);
      this.setAuth(true);
      this.setUser(data);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

  async logout() {
    try {
      const { data } = await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const { data } = await axios.get<AuthResponse>(`${BASE_URL}/auth/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', data.accessToken);
      this.setAuth(true);
      this.setUser(data);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }
}
