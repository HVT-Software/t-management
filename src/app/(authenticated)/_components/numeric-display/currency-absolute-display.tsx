'use client';

import { NumericFormatProps } from 'react-number-format';

import CurrencyDisplay from './currency-display';

const CurrencyAbsoluteDisplay: React.FC<NumericFormatProps> = (props) => {
  if (!!props.value && +props.value < 0) {
    return (
      <>
        (<CurrencyDisplay allowNegative={false} {...props} />)
      </>
    );
  }

  return <CurrencyDisplay {...props} />;
};

export default CurrencyAbsoluteDisplay;
