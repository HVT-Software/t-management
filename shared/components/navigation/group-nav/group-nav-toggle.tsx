'use client';

import { KeyboardArrowRightRounded } from '@mui/icons-material';
import { Box } from '@mui/material';
import type { NavigationInfo } from '@shared/types/navigation-info';
import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';
import { forwardRef, useCallback, useMemo } from 'react';

import { NavItem } from '../nav-item';
import { ARROW_CLASS, NAME_CLASS } from '../navigation.constants';

interface GroupNavToggleProps {
  toggle: () => void;
  expanded: boolean;
  navInfo: NavigationInfo;
  sidebarExpanded?: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const GroupNavToggle = forwardRef<HTMLDivElement, GroupNavToggleProps>(
  ({ expanded, handleClose, handleOpen, navInfo, sidebarExpanded, toggle }, ref) => {
    // const segment = useSelectedLayoutSegment();
    // const isActive = segment === `(${navInfo?.path})`;
    const pathName = usePathname();
    const isActive = useMemo(() => {
      return (
        navInfo?.children?.some((child) => pathName === child?.path || pathName.startsWith(`${child?.path}/`)) ?? false
      );
    }, [pathName]);

    const handleClick = useCallback(() => {
      if (!sidebarExpanded) {
        return;
      }
      toggle();
    }, [sidebarExpanded]);

    const handleMouseEnter = useCallback(() => {
      if (sidebarExpanded) {
        return;
      }
      handleOpen();
    }, [sidebarExpanded]);

    const handleMouseLeave = useCallback(() => {
      if (sidebarExpanded) {
        return;
      }
      handleClose();
    }, [sidebarExpanded]);

    return (
      <NavItem
        onClick={handleClick}
        selected={isActive}
        ref={ref}
        onMouseOver={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className={clsx(navInfo?.icon, 'min-h-6 min-w-6', { 'mr-2': sidebarExpanded })} />
        <Box minWidth={0} className={clsx(NAME_CLASS, { 'mt-1': !sidebarExpanded })} whiteSpace='nowrap'>
          {sidebarExpanded ? navInfo?.name : (navInfo?.shortName ?? navInfo?.name)}
        </Box>
        <KeyboardArrowRightRounded
          fontSize='small'
          className={clsx('transition-transform', ARROW_CLASS, {
            'rotate-90': expanded && sidebarExpanded
          })}
        />
      </NavItem>
    );
  }
);

export default GroupNavToggle;
