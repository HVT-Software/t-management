import { getQueryClient } from '@config/trpc/query-client';
import { trpcServer } from '@config/trpc/server';
import { CATEGORY_FILTER_COOKIE_NAME } from '@modules/category/category.constants';
import CategoryTable from '@modules/category/components/category-table/category-table';
import { categoryFilterDefault } from '@modules/category/models/category-filter';
import { getFilterFromCookie } from '@shared/helpers/filter-helpers';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const CategoryListPage: React.FC = async () => {
  const queryClient = getQueryClient();
  const initFilter = await getFilterFromCookie(CATEGORY_FILTER_COOKIE_NAME, categoryFilterDefault);

  void queryClient.prefetchQuery(trpcServer.category.list.queryOptions(initFilter));

  const state = dehydrate(queryClient);

  return (
    <HydrationBoundary state={state}>
      <CategoryTable initFilter={initFilter} />
    </HydrationBoundary>
  );
};

export default CategoryListPage;
