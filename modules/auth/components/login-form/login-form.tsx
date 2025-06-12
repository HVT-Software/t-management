'use client';

import { transactionsPath } from '@app/routes';
import { Button, TextField, Typography } from '@mui/material';
import { useForm } from '@tanstack/react-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { type LoginDto, loginDto, loginDtoDefault } from '../../dto/login-dto';
import { FormBox } from './login-form.styles';

const TITLE = 'Đăng nhập';
const SUBMIT_BUTTON_LABEL = 'Đăng nhập';

const LoginForm: React.FC = () => {
  const router = useRouter();

  const submitCallback = useCallback(async ({ value: payload }: { value: LoginDto }) => {
    const res = await signIn('credentials', { ...payload, redirect: false });

    if (res?.error) {
      toast.error(res.error);
    } else {
      router.replace(transactionsPath);
    }
  }, []);

  const form = useForm({
    validators: {
      onSubmit: loginDto
    },
    defaultValues: loginDtoDefault,
    onSubmit: submitCallback
  });

  return (
    <FormBox>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
      >
        <div className='mb-10'>
          <Typography typography='h4'>{TITLE}</Typography>
        </div>
        <div className='flex h-full flex-col gap-6'>
          <form.Field name='tenantCode'>
            {({ state, handleChange, handleBlur }) => (
              <TextField
                label='Mã công ty'
                fullWidth
                defaultValue={state.value}
                onBlur={handleBlur}
                error={state.meta?.errors?.length > 0}
                helperText={state.meta?.errors?.[0]?.message}
                onChange={(e) => handleChange(e.target.value)}
              />
            )}
          </form.Field>
          <form.Field name='username'>
            {({ state, handleChange, handleBlur }) => (
              <TextField
                label='Tên đăng nhập'
                fullWidth
                defaultValue={state.value}
                onBlur={handleBlur}
                error={state.meta?.errors?.length > 0}
                helperText={state.meta?.errors?.[0]?.message}
                onChange={(e) => handleChange(e.target.value)}
              />
            )}
          </form.Field>
          <form.Field name='password'>
            {({ state, handleChange, handleBlur }) => (
              <TextField
                label='Mật khẩu'
                fullWidth
                defaultValue={state.value}
                onBlur={handleBlur}
                error={state.meta?.errors?.length > 0}
                helperText={state.meta?.errors?.[0]?.message}
                onChange={(e) => handleChange(e.target.value)}
                type='password'
              />
            )}
          </form.Field>
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button fullWidth variant='contained' size='large' type='submit' loading={isSubmitting}>
                {SUBMIT_BUTTON_LABEL}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </FormBox>
  );
};

export default LoginForm;
