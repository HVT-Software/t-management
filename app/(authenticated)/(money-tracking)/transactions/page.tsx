
import { api, HydrateClient } from '@config/trpc/server';
import { CATEGORY_FILTER_COOKIE_NAME } from '@modules/category/category.constants';
import { categoryFilterDefault } from '@modules/category/models/category-filter';
import { getFilterFromCookie } from '@shared/helpers/filter-helpers';

const CategoryListPage: React.FC = async () => {
  const initFilter = await getFilterFromCookie(CATEGORY_FILTER_COOKIE_NAME, categoryFilterDefault);
  void api.category.list.prefetch(initFilter);


  return 	<HydrateClient><></></HydrateClient>;
};

export default CategoryListPage;
