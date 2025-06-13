import { z } from 'zod';

const REQUIRED_USERNAME_MESSAGE = 'Tên đăng nhập không được để trống';
const REQUIRED_PASSWORD_MESSAGE = 'Mật khẩu không được để trống';

export const loginDto = z.object({
  username: z
    .string({
      message: REQUIRED_USERNAME_MESSAGE
    })
    .min(1, { message: REQUIRED_USERNAME_MESSAGE }),
  password: z
    .string({
      message: REQUIRED_PASSWORD_MESSAGE
    })
    .min(1, { message: REQUIRED_PASSWORD_MESSAGE })
});

export type LoginDto = z.infer<typeof loginDto>;

export const loginDtoDefault: LoginDto = {
  username: '',
  password: ''
};
