'use client';

import { categoryFilterDefault } from '@modules/category/models/category-filter';
import { SearchField } from '@shared/components/search-field';
import { withForm } from '@shared/utilities/form-context';

const CategoryTableFilter = withForm({
  defaultValues: categoryFilterDefault,
  render: ({ form }) => {
    return (
      <form.AppField name='searchText'>
        {({ state, handleChange, handleBlur }) => (
          <SearchField
            label='Tìm kiếm'
            placeholder='Nhập biển số, mã xe'
            variant='outlined'
            className='w-60'
            value={state.value}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
          />
        )}
      </form.AppField>
    );
  }
});

export default CategoryTableFilter;
