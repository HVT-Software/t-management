'use client';

import { Box } from '@mui/material';
import type { NavigationInfo } from '@shared/types/navigation-info';
import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { NavItem } from '../nav-item';
import { NAME_CLASS } from '../navigation.constants';

interface SingleNavProps {
  navInfo: NavigationInfo;
  sidebarExpanded?: boolean;
}

const SingleNav: React.FC<SingleNavProps> = ({ navInfo, sidebarExpanded = false }) => {
  const pathName = usePathname();

  const isActive = useMemo(() => pathName === navInfo?.path, [pathName, navInfo?.path]);

  return (
    <Link href={navInfo.path}>
      <NavItem selected={isActive}>
        <span className={clsx(navInfo?.icon, 'min-h-6 min-w-6', { 'mr-2': sidebarExpanded })} />
        <Box minWidth={0} className={clsx(NAME_CLASS, { 'mt-1': !sidebarExpanded })} whiteSpace='nowrap'>
          {sidebarExpanded ? navInfo.name : (navInfo.shortName ?? navInfo.name)}
        </Box>
      </NavItem>
    </Link>
  );
};

export default SingleNav;
