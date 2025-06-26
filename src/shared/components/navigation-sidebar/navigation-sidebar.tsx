'use client';

import { IconButton, useMediaQuery } from '@mui/material';
import DefaultLogo from '@shared/assets/images/default-logo.png';
import { Navigation } from '@shared/components/navigation';
import { useToggle } from '@shared/hooks/use-toggle';
import type { NavigationInfo } from '@shared/types/navigation-info';
import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { SIDEBAR_COLLAPSED } from '../navigation/navigation.constants';
import { NavigationBox, StyledDrawer } from './navigation-sidebar.styles';

interface SidebarProps {
  navItems: Array<NavigationInfo>;
}

const NavigationSidebar: React.FC<SidebarProps> = ({ navItems }) => {
  const isMobile = useMediaQuery('(max-width: 768px)', { defaultMatches: false });
  const { isOpen: expanded, toggle } = useToggle();

  return (
    <StyledDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={expanded}
      className={clsx({ [SIDEBAR_COLLAPSED]: !expanded })}
      onClose={toggle}
    >
      <IconButton
        onClick={toggle}
        size='small'
        className={clsx(
          'border-grey-500/20 !absolute -right-[13px] z-[3000] border border-solid bg-blend-color',
          {
            'rotate-180': expanded
          },
          'bg-[var(--fms-palette-background-default)] hover:bg-[var(--fms-palette-background-neutral)]',
          'top-8 hidden md:flex'
        )}
      >
        <span className='i-eva-arrow-ios-forward-fill h-4 w-4' />
      </IconButton>
      <div className={clsx('p-4', !expanded ? 'flex justify-center' : '')}>
        <Link href='/'>
          <Image
            alt='logo'
            src={DefaultLogo}
            className='h-7 w-auto'
            priority
            width={1000}
            height={28}
            loading='eager'
          />
        </Link>
      </div>
      <NavigationBox>
        {navItems.map((navItem) => (
          <Navigation key={navItem.path} navInfo={navItem} sidebarExpanded={expanded} />
        ))}
      </NavigationBox>
    </StyledDrawer>
  );
};

export default NavigationSidebar;
