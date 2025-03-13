export interface LoginResponse {
  userId: string;
  token: string;
  expiresIn: number;
  refreshToken: string;
  tokenType: string;
}
