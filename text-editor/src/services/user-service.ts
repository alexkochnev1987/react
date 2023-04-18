import { AxiosResponse } from 'axios';
import { AuthResponse } from '~/models/response/auth-response';
import { $api } from '../http/index';

export class UserService {
  static async fetchUsers(): Promise<AxiosResponse<AuthResponse[]>> {
    return $api.get<AuthResponse[]>('/auth/login');
  }
}
