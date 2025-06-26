'use client';

import { NumericFormat, NumericFormatProps } from 'react-number-format';

const QuantityDisplay: React.FC<NumericFormatProps> = (props) => {
  return <NumericFormat thousandSeparator=',' decimalSeparator='.' decimalScale={2} {...props} displayType='text' />;
};

export default QuantityDisplay;
