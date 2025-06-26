'use client';

import { CategoryFilter } from '@modules/category/models/category-filter';
import { Card } from '@mui/material';
import { AddButon } from '@shared/components/buttons';
import { MRT_TableContainer, MRT_TablePagination } from 'material-react-table';

import CategoryTableFilter from './category-table-filter';
import { useCategoryTable } from './use-category-table';

interface CategoryTableProps {
  initFilter: CategoryFilter;
}

const CategoryTable: React.FC<CategoryTableProps> = ({ initFilter }) => {
  const { form, table } = useCategoryTable(initFilter);

  return (
    <Card>
      <div className='mt-1 flex flex-wrap items-center gap-2 p-2'>
        <AddButon onClick={() => table.setCreatingRow(true)} />
        <CategoryTableFilter form={form} />
      </div>
      <div className='mt-2'>
        <MRT_TableContainer table={table} />
        <MRT_TablePagination table={table} />
      </div>
    </Card>
  );
};

export default CategoryTable;
