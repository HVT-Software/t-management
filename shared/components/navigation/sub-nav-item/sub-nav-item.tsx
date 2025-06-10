'use client';

import { Typography } from '@mui/material';
import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { DotIcon, StyledListItemButton } from './sub-nav-item.styles';

interface SubNavItemProps {
  path: string;
  text?: React.ReactNode;
}

const SubNavItem: React.FC<SubNavItemProps> = ({ path, text }) => {
  // const segments = useSelectedLayoutSegments();
  const pathName = usePathname();

  // const active = useMemo(() => {
  //   if (path?.includes('/')) {
  //     const paths = path.split('/');
  //     console.log(paths, segments);
  //     return paths.every((currPath) => segments.includes(currPath));
  //   }
  //   return segments.includes(path);
  // }, [segments, path]);

  const active = useMemo(() => {
    return pathName === path || pathName.startsWith(`${path}/`);
  }, [pathName, path]);

  return (
    <Typography href={path} component={Link} variant='body2' fontWeight={500}>
      <StyledListItemButton className={clsx({ active })}>
        <DotIcon />
        {text}
      </StyledListItemButton>
    </Typography>
  );
};

export default SubNavItem;
