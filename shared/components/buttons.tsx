import { Add, Refresh, Search } from '@mui/icons-material';
import { Button, ButtonProps } from '@mui/material';
import { ArrowLeft, SaveIcon } from 'lucide-react';

interface IButtonAction extends ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const SaveButon: React.FC<IButtonAction> = ({ ...props }) => {

  return (
    <Button {...props} size='small' variant='contained' color='primary'>
      <SaveIcon className='mr-1 !size-5' />
      Lưu
    </Button>
  );
};

const AddButon: React.FC<IButtonAction> = ({ ...props }) => {
  return (
    <Button {...props} size='small' variant='contained' color='primary'>
      <Add className='mr-1 !size-5' />
      Thêm mới
    </Button>
  );
};

const SearchButon: React.FC<IButtonAction> = ({ ...props }) => {
  return (
    <Button {...props} size='small' variant='outlined' color='info'>
      <Search className='mr-1 !size-5' />
      Tìm kiếm
    </Button>
  );
};

const BackButon: React.FC<IButtonAction> = ({ ...props }) => {
  return (
    <Button {...props} size='small' variant='contained' color='error'>
      <ArrowLeft className='mr-1 !size-5' />
      Quay lại
    </Button>
  );
};
const RefreshButon: React.FC<IButtonAction> = ({ ...props }) => {
  return (
    <Button {...props} size='small' variant='outlined'>
      <Refresh className='mr-1 !size-5' />
      Làm mới
    </Button>
  );
};

export { AddButon, BackButon, RefreshButon, SaveButon, SearchButon };
