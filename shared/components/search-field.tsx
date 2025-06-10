import { debounce, IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { MRT_GlobalFilterTextField, type MRT_GlobalFilterTextFieldProps, type MRT_RowData } from 'material-react-table';
import { useCallback, useState } from 'react';

const DEBOUNCE_TIME = 500;

type SearchFieldProps = TextFieldProps & {
  textLimit?: number;
};

export const SearchField: React.FC<SearchFieldProps> = ({ onChange, textLimit, ...props }) => {
  const [localValue, setLocalValue] = useState(props.value);

  const changeToRoot = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    }, DEBOUNCE_TIME),
    []
  );

  const debouncedOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    if (textLimit) {
      e.target.value = e.target.value.slice(0, Math.max(textLimit - 1, 0));
    }
    setLocalValue(e.target.value);
    changeToRoot(e);
  }, []);

  const handleClear = useCallback(() => {
    setLocalValue('');
    onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  }, []);

  return (
    <TextField
      {...props}
      value={localValue}
      onChange={debouncedOnChange}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton size='small' onClick={handleClear} className='p-0.5' disabled={!localValue}>
                <span className='i-solar-close-circle-bold-duotone h-5 w-5' />
              </IconButton>
            </InputAdornment>
          ),
          startAdornment: (
            <InputAdornment position='start'>
              <span className='i-iconamoon-search-duotone h-5 w-5' />
            </InputAdornment>
          )
        }
      }}
    />
  );
};

export function TableSearchField<T extends MRT_RowData>({ table, ...props }: MRT_GlobalFilterTextFieldProps<T>) {
  return (
    <MRT_GlobalFilterTextField
      table={table}
      {...props}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                size='small'
                onClick={() => table.resetGlobalFilter(true)}
                className='p-0.5'
                disabled={!table.getState().globalFilter}
              >
                <span className='i-solar-close-circle-bold-duotone h-5 w-5' />
              </IconButton>
            </InputAdornment>
          ),
          startAdornment: (
            <InputAdornment position='start'>
              <span className='i-iconamoon-search-duotone h-5 w-5' />
            </InputAdornment>
          )
        }
      }}
    />
  );
}
