import { IUser } from '../iuser';

export interface AuthResponse extends IUser {
  accessToken: string;
  refreshToken: string;
}
