'use client';

import ColorSchemeToggle from '@shared/components/color-scheme-toggle';
import { useEffect, useRef } from 'react';
import throttle from 'throttleit';

import { DESKTOP_HEADER_HEIGHT, MOBILE_HEADER_HEIGHT } from './main-header.constants';
import { StyledAppBar, StyledToolbar } from './main-header.styles';
import UserMenu from './user-menu';

interface MainHeaderProps {
  mode?: 'dark' | 'light';
}

const MainHeader: React.FC<MainHeaderProps> = ({ mode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const changeHeight = throttle(() => {
      if (window.innerWidth < 720) {
        ref.current!.style.height = `${MOBILE_HEADER_HEIGHT}px`;
        return;
      }
      if (window.scrollY > 20) {
        ref.current!.style.height = `${MOBILE_HEADER_HEIGHT}px`;
      } else {
        ref.current!.style.height = `${DESKTOP_HEADER_HEIGHT}px`;
      }
    }, 200);

    document.addEventListener('scroll', changeHeight);
    return () => {
      document.removeEventListener('scroll', changeHeight);
    };
  }, []);

  return (
    <StyledAppBar>
      <StyledToolbar ref={ref}>
        <div className='flex w-full items-center justify-end gap-4 [&>*]:h-fit'>
          <ColorSchemeToggle initMode={mode} />
          <UserMenu />
        </div>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default MainHeader;
