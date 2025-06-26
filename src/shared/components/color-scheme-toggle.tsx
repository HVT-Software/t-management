'use client';

import { IconButton, useColorScheme } from '@mui/material';
import { clsx } from 'clsx';
import { useCallback } from 'react';

interface ColorSchemeToggleProps {
  initMode?: 'dark' | 'light';
}

const ColorSchemeToggle: React.FC<ColorSchemeToggleProps> = ({ initMode }) => {
  const { mode, setMode } = useColorScheme();
  const isCurrentModeDark = (mode ?? initMode) === 'dark';

  const handleChangeMode = useCallback(async () => {
    const newMode = isCurrentModeDark ? 'light' : 'dark';
    setMode(newMode);
  }, [isCurrentModeDark]);

  return (
    <IconButton
      className='bg-primary/10 h-fit !rounded-xl transition-all hover:scale-110'
      onClick={handleChangeMode}
      color='primary'
    >
      <span
        className={clsx('h-5 w-5', {
          'i-solar-sun-2-bold-duotone': !isCurrentModeDark,
          'i-solar-moon-bold-duotone': isCurrentModeDark
        })}
      />
    </IconButton>
  );
};

export default ColorSchemeToggle;
