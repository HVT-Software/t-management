'use client';

import { Collapse } from '@mui/material';
import { useToggle } from '@shared/hooks/use-toggle';
import type { NavigationInfo } from '@shared/types/navigation-info';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef } from 'react';

import { SubNavItem } from '../sub-nav-item';
import GroupNavMenu from './group-nav-menu';
import GroupNavToggle from './group-nav-toggle';

interface GroupNavProps {
  navInfo: NavigationInfo;
  sidebarExpanded?: boolean;
}

const GroupNav: React.FC<GroupNavProps> = ({ navInfo, sidebarExpanded }) => {
  const { isOpen: expanded, toggle, handleOpen, handleClose } = useToggle();
  const anchorRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();

  useLayoutEffect(() => {
    if (!sidebarExpanded) {
      handleClose();
    }
    const isActive = navInfo?.children?.some(
      (child) => pathName === child?.path || pathName.startsWith(`${child?.path}/`)
    );
    if (sidebarExpanded && isActive) {
      setTimeout(() => {
        handleOpen();
      }, 200);
    }
  }, [sidebarExpanded]);

  return (
    <>
      <GroupNavToggle
        toggle={toggle}
        handleOpen={handleOpen}
        handleClose={handleClose}
        expanded={expanded}
        navInfo={navInfo}
        sidebarExpanded={Boolean(sidebarExpanded)}
        ref={anchorRef}
      />
      <Collapse in={expanded && sidebarExpanded} timeout='auto' unmountOnExit>
        {navInfo.children?.map((child) => <SubNavItem key={child.path} path={child.path} text={child.name} />)}
      </Collapse>
      <GroupNavMenu
        navInfos={navInfo?.children}
        preOpen={expanded && !sidebarExpanded}
        anchorEl={anchorRef?.current}
        closeMenu={handleClose}
      />
    </>
  );
};

export default GroupNav;
