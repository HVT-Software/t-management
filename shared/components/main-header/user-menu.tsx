'use client';

import { Divider, IconButton, MenuItem, Popover, Typography } from '@mui/material';
import { useToggle } from '@shared/hooks/use-toggle';
import { clsx } from 'clsx';
import { signOut, useSession } from 'next-auth/react';
import { useRef } from 'react';

const UserMenu: React.FC = () => {
  const { isOpen, handleOpen, handleClose } = useToggle();
  const ref = useRef<HTMLButtonElement>(null);
  const session = useSession();
  return (
    <>
      <IconButton
        className='!bg-primary/20 !rounded-xl !p-0.5 transition-all hover:scale-110'
        onClick={handleOpen}
        ref={ref}
        color='primary'
      >
        <div
          className={clsx(
            'border-background-default',
            'flex h-7 w-7 items-center justify-center rounded-xl border-2 border-solid p-0.5'
          )}
        >
          <span className='i-solar-user-rounded-bold-duotone h-6 w-6' />
        </div>
      </IconButton>
      <Popover
        open={isOpen}
        anchorEl={ref.current}
        onClose={handleClose}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom'
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
        slotProps={{
          paper: {
            className: 'backdrop-blur-md p-0 w-[200px] mt-1 border border-solid border-grey-500/10'
          }
        }}
      >
        <div className='px-4 pt-4 pb-3'>
          <Typography variant='subtitle2' component='h6'>
            {session?.data?.user?.username}
          </Typography>
          <Typography variant='caption'>{session?.data?.user?.tenantName}</Typography>
        </div>
        <Divider variant='fullWidth' className='!border-dashed' />
        <div className='p-2'>
          <MenuItem>Đổi mật khẩu</MenuItem>
          <MenuItem>Đổi mã PIN</MenuItem>
        </div>
        <Divider variant='fullWidth' className='!border-dashed' />
        <div className='p-2'>
          <MenuItem onClick={() => signOut({ callbackUrl: '/login', redirect: true })}>Đăng xuất</MenuItem>
        </div>
      </Popover>
    </>
  );
};

export default UserMenu;
