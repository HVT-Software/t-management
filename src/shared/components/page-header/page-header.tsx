import { IconButton, Typography } from '@mui/material';
import Link from 'next/link';

interface PageHeaderProps {
  backTo?: string;
  children?: React.ReactNode;
  title: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ backTo, children, title }) => {
  return (
    <div className='mb-4 flex flex-wrap justify-between gap-2 md:flex-row'>
      <div className='flex items-center gap-2'>
        {Boolean(backTo) && (
          <IconButton className='h-fit' component={Link} href={backTo!}>
            <span className='i-solar-alt-arrow-left-linear h-4 w-4' />
          </IconButton>
        )}
        <Typography component='div' variant='h4' className='flex justify-between gap-2 md:flex-row md:justify-start'>
          {title}
        </Typography>
      </div>
      <div className='flex grow justify-end'>{children}</div>
    </div>
  );
};

export default PageHeader;
