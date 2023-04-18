import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/auth-response';
import { $api } from '../http/index';

export class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/login', { email, password });
  }

  static async registration(
    email: string,
    password: string,
    username: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/registration', { email, password, username });
  }

  static async logout(): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/logout');
  }

  static async getUsers(): Promise<AxiosResponse<AuthResponse[]>> {
    return $api.get<AuthResponse[]>('/auth/users');
  }
}
