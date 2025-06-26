'use client';

import { Box, Grow, MenuItem, MenuList, Paper, Popper, PopperProps } from '@mui/material';
import { useToggle } from '@shared/hooks/use-toggle';
import type { NavigationInfo } from '@shared/types/navigation-info';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback } from 'react';

interface GroupNavMenuProps {
  navInfos?: Array<NavigationInfo>;
  preOpen: boolean;
  anchorEl: PopperProps['anchorEl'];
  closeMenu: () => void;
}

const GroupNavMenu: React.FC<GroupNavMenuProps> = ({ anchorEl, navInfos, preOpen, closeMenu }) => {
  const { isOpen, handleOpen, handleClose } = useToggle();
  // const segments = useSelectedLayoutSegments();
  const pathName = usePathname();

  const handleMenuClick = useCallback(() => {
    handleClose();
    closeMenu();
  }, []);

  return (
    <Popper
      open={preOpen || isOpen}
      anchorEl={anchorEl}
      role='menu'
      placement='right'
      transition
      onMouseOver={handleOpen}
      onMouseLeave={handleClose}
      className='z-[3000] hidden md:block'
      keepMounted={false}
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          timeout={{
            enter: 250,
            exit: 0
          }}
        >
          <Box component={Paper}>
            <MenuList autoFocusItem={isOpen && preOpen}>
              {navInfos?.map((navInfo) => (
                <MenuItem
                  key={navInfo.name}
                  component={Link}
                  href={`${navInfo?.path}`}
                  selected={pathName === navInfo?.path || pathName.startsWith(`${navInfo?.path}/`)}
                  onClick={handleMenuClick}
                >
                  {navInfo.name}
                </MenuItem>
              ))}
            </MenuList>
          </Box>
        </Grow>
      )}
    </Popper>
  );
};

export default GroupNavMenu;
