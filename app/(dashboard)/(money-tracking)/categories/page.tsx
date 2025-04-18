import { HydrateClient, trpcServer } from "@/app/_trpc/server";
import { Params } from "@/types/common";
import { CategoryFilter, categoryParamsCache } from "../transactions/_lib/category-validations";
import { CategoryTable } from "./_components/category-table/category-table";

const CategoryPage: React.FC<Params> = async ({ searchParams }) => {
  const searchParamsValue = await searchParams;
  const defaultFilter: CategoryFilter = categoryParamsCache.parse(searchParamsValue);

  await trpcServer.category.list.prefetch(defaultFilter);

  return (
    <HydrateClient>
      <CategoryTable filter={defaultFilter} />a
    </HydrateClient>
  );
};

export default CategoryPage;
