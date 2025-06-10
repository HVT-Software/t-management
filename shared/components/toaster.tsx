'use client';

import { clsx } from 'clsx';
import { Toaster as BaseToaster, ToasterProps } from 'sonner';

const toastOptions: ToasterProps['toastOptions'] = {
  duration: 3000,
  classNames: {
    toast: 'p-2! whitespace-pre-wrap! bg-background-neutral!',
    success: 'text-success! [&>[data-icon]]:bg-success/[0.08]! border-primary/30!',
    info: 'text-primary! [&>[data-icon]]:bg-primary/[0.08]! border-info/30!',
    warning: 'text-warning! [&>[data-icon]]:bg-warning/[0.08]! border-warning/30!',
    error: 'text-error! [&>[data-icon]]:bg-error/[0.08]! border-error/30!',
    icon: 'flex items-center! justify-center! p-3! rounded-lg! w-auto! h-auto! ml-0!',
    loader: 'relative! top-auto! left-auto! transform-none! bg-background-neutral! rounded-lg! -m-3! p-2!'
  }
};

const toastIcons: ToasterProps['icons'] = {
  success: <span className='i-solar-check-circle-bold-duotone h-5 w-5' />,
  info: <span className='i-solar-info-circle-bold-duotone h-5 w-5' />,
  warning: <span className='i-solar-danger-triangle-bold h-5 w-5' />,
  error: <span className='i-solar-danger-bold-duotone h-5 w-5' />,
  loading: (
    <span
      className={clsx(
        'animate-spin-slow block! h-6! w-6! rounded-full!',
        'to-50 from-bg-primary-light/30 to-primary-light/30 bg-conic'
      )}
    />
  )
};

const Toaster: React.FC = () => {
  return <BaseToaster position='top-right' toastOptions={toastOptions} icons={toastIcons} visibleToasts={2} />;
};

export default Toaster;
