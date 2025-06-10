'use client';

import type { NavigationInfo } from '@shared/types/navigation-info';
import { memo } from 'react';

import { GroupNav } from './group-nav';
import { SingleNav } from './single-nav';

interface NavigationProps {
  navInfo: NavigationInfo;
  sidebarExpanded?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ navInfo, sidebarExpanded }) => {
  return navInfo?.children ? (
    <GroupNav navInfo={navInfo} sidebarExpanded={sidebarExpanded} />
  ) : (
    <SingleNav navInfo={navInfo} sidebarExpanded={sidebarExpanded} />
  );
};

export default memo(Navigation);
