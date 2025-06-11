'use client';

import { Button } from '@mui/material';
import { toast } from 'sonner';

export default function Home() {
  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <Button
        onClick={() => {
          toast.warning('clicked');
        }}
        startIcon={<span className='i-solar-4k-bold' />}
      >
        OK
      </Button>
    </div>
  );
}
