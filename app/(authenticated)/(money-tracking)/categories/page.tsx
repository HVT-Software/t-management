'use client';

import CategoryTable from '@modules/category/components/category-table/category-table';
import { categoryFilterDefault } from '@modules/category/models/category-filter';

const CategoryListPage: React.FC = () => {
  return (
    <>
      <CategoryTable initFilter={categoryFilterDefault} />
    </>
  );
};

export default CategoryListPage;
