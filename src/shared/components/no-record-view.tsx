import { Typography } from '@mui/material';
import { NoDataIcon } from '@shared/assets/icons';

interface NoRecordViewProps {
  text?: string;
}

const DEFAULT_TEXT = 'Không tìm thấy kết quả';

const NoRecordView: React.FC<NoRecordViewProps> = ({ text = DEFAULT_TEXT }) => {
  return (
    <div className='p-4'>
      <div className='bg-text-disabled/5 flex flex-col items-center justify-center rounded-2xl px-6 py-12'>
        <div className='h-40 w-40 max-w-40'>
          <NoDataIcon />
        </div>
        <Typography component='span' variant='h6' color='text.disabled'>
          {text}
        </Typography>
      </div>
    </div>
  );
};

export default NoRecordView;
