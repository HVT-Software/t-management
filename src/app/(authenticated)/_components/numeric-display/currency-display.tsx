'use client';

import clsx from 'clsx';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

const CurrencyDisplay: React.FC<NumericFormatProps> = ({ value, ...props }) => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : Number(value);
  const isPositive = numericValue > 0;

  return (
    <NumericFormat
      className={clsx(isPositive ? 'text-green-600' : 'text-red-600')}
      thousandSeparator=','
      decimalSeparator='.'
      fixedDecimalScale
      value={value}
      {...props}
      displayType='text'
    />
  );
};

export default CurrencyDisplay;
