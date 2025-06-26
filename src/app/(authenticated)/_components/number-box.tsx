import { IconButton, InputAdornment, TextField, type TextFieldProps } from '@mui/material';
import { NumericFormat, type NumericFormatProps, type SourceInfo } from 'react-number-format';

export interface BaseNumericFieldProps extends NumericFormatProps<Omit<TextFieldProps, 'inputProps' | 'variant'>> {
  showButtons?: boolean;
  value?: number | null;
  min?: number;
  max?: number;
  variant?: 'outlined' | 'filled' | 'standard';
  textPosition?: 'text-right' | 'text-left';
}

const NumericField: React.FC<BaseNumericFieldProps> = ({
  showButtons = false,
  textPosition = 'text-left',
  ...props
}) => {
  const { onValueChange, value, min, max, slotProps } = props;

  const updateValue = (newValue: number) => {
    if (onValueChange) {
      onValueChange({ floatValue: newValue, value: newValue.toString(), formattedValue: newValue.toString() }, {
        source: 'event'
      } as SourceInfo);
    }
  };

  const handleIncrement = () => {
    updateValue((value ?? 0) + 1);
  };

  const handleDecrement = () => {
    updateValue((value ?? 0) - 1);
  };

  const isIncrementDisabled = (Number(value) || 1) >= (Number(max) || Infinity);
  const isDecrementDisabled = (Number(value) || 1) <= (Number(min) || -Infinity);

  const inputEndAdornment = showButtons ? (
    <InputAdornment position='end'>
      <div className='flex flex-col gap-0.5'>
        <IconButton size='small' className='!p-0.5' onClick={handleIncrement} disabled={isIncrementDisabled}>
          <span className='i-solar-alt-arrow-up-bold h-3 w-3' />
        </IconButton>
        <IconButton size='small' className='!p-0.5' onClick={handleDecrement} disabled={isDecrementDisabled}>
          <span className='i-solar-alt-arrow-down-bold h-3 w-3' />
        </IconButton>
      </div>
    </InputAdornment>
  ) : (
    // @ts-ignore
    slotProps?.input?.endAdornment
  );

  return (
    <NumericFormat
      customInput={TextField}
      {...props}
      slotProps={
        props.displayType !== 'text'
          ? {
              input: {
                ...slotProps?.input,
                endAdornment: inputEndAdornment
              },
              htmlInput: {
                ...slotProps?.htmlInput,
                className: textPosition
              }
            }
          : undefined
      }
    />
  );
};

const CurrencyField: React.FC<BaseNumericFieldProps> = (props) => {
  return <NumericField {...props} decimalSeparator=',' thousandSeparator='.' />;
};

export { CurrencyField };
