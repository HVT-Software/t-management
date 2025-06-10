import { Typography, TypographyProps } from '@mui/material';
import { clsx } from 'clsx';
import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';

interface LinkProps extends Omit<TypographyProps<'a'>, 'href'> {
  href: Url;
  scroll?: boolean;
  prefetch?: boolean;
}

const FumyLink: React.FC<LinkProps> = ({
  href,
  fontWeight = 500,
  color = 'primary.dark',
  className,
  prefetch = false,
  ...props
}) => {
  return (
    <Typography
      {...props}
      prefetch={prefetch}
      variant='inherit'
      component={Link}
      href={href}
      fontWeight={fontWeight}
      color={color}
      className={clsx('hover:underline', className)}
    />
  );
};

export default FumyLink;
