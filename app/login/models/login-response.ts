export interface LoginResponse {
  refreshToken: string;
  token: string;
  merchantCode: string;
  merchantName: string;
  username: string;
  name: string;
  email?: string;
  image?: string;
  expiredTime: number;
  session: number;
}
