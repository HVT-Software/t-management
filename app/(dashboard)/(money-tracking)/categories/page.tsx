import { Params } from "@/types/common";
import { CategoryFilter, categoryParamsCache } from "../transactions/_lib/category-validations";
import { HydrateClient, trpcServer } from "@/app/_trpc/server";
import { Card } from "@/components/ui/card";
import { CategoryTable } from "./_components/category-table/category-table";
import { CategoryDialog } from "./_components/category-dialiog";

const CategoryPage: React.FC<Params> = async ({ searchParams }) => {
  const searchParamsValue = await searchParams;
  const defaultFilter: CategoryFilter = categoryParamsCache.parse(searchParamsValue);

  await trpcServer.category.list.prefetch(defaultFilter);

  return (
    <HydrateClient>
      <div className="flex flex-col gap-2 ">
        <div className="flex items-center justify-end py-2 gap-2">
          <CategoryDialog />
        </div>
        <Card className="flex flex-col p-2">
          <CategoryTable filter={defaultFilter} />
        </Card>
      </div>
    </HydrateClient>
  );
};

export default CategoryPage;
