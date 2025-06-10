'use client';

import { useCallback, useState } from 'react';

export const useToggle = (init = false) => {
  const [isOpen, setIsOpen] = useState(init);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, handleOpen, handleClose, toggle };
};
