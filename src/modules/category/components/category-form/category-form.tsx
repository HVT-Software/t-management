'use client';

import { CurrencyField } from '@app/(authenticated)/_components/number-box';
import { categoryDefault } from '@modules/category/models/category';
import { TextField } from '@mui/material';
import { withForm } from '@shared/utilities/form-context';

const CategoryForm = withForm({
  defaultValues: categoryDefault,
  render: ({ form }) => {
    return (
      <div className='grid grid-cols-12 gap-2'>
        <form.AppField name='name'>
          {({ state, handleChange, handleBlur }) => {
            return (
              <TextField
                label='Tên danh mục'
                variant='outlined'
                className='col-span-12 md:col-span-6'
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={!state.meta.isValid}
                helperText={(state.meta.errors[0] as any)?.message}
              />
            );
          }}
        </form.AppField>
        <form.AppField name='budget'>
          {({ state, handleChange, handleBlur }) => (
            <CurrencyField
              label='Ngân sách'
              variant='outlined'
              className='col-span-12 md:col-span-6'
              value={state.value}
              onValueChange={(e) => handleChange(e.floatValue || 0)}
              onBlur={handleBlur}
            />
          )}
        </form.AppField>
        <form.AppField name='description'>
          {({ state, handleChange, handleBlur }) => (
            <TextField
              label='Ngân sách'
              variant='outlined'
              className='col-span-12'
              value={state.value}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
            />
          )}
        </form.AppField>
      </div>
    );
  }
});

export default CategoryForm;
