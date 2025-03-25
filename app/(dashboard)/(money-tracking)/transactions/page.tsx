import { HydrateClient, trpcServer } from "@app/_trpc/server";
import { DataTableSkeleton } from "@components/data-table/data-table-skeleton";
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import { SearchParams } from "@lib/types";
import { BriefcaseBusiness, HandCoins } from "lucide-react";
import { Suspense } from "react";
import { HoTaTooltip } from "../../../../components/shared/hota-tooltip";
import { TransactionTable } from "./_components/transaction-table/transaction-table";
import { searchParamsCache, TransactionFilter } from "./_lib/validations";

interface TransactionPageProps {
  searchParams: Promise<SearchParams>;
}

const TransactionsPage: React.FC<TransactionPageProps> = async ({ searchParams }) => {
  const searchParamsValue = await searchParams;
  const defaultFilter: TransactionFilter = searchParamsCache.parse(searchParamsValue);

  await trpcServer.transaction.list.prefetch(defaultFilter);

  return (
    <HydrateClient>
      <div className="flex flex-col gap-2 ">
        <Card className="h-10"></Card>
        <Card className="flex flex-col">
          <div className="flex items-center justify-end p-2 gap-2">
            <HoTaTooltip content="Danh mục">
              <Button variant="outline" size="icon">
                <BriefcaseBusiness />
              </Button>
            </HoTaTooltip>
            <HoTaTooltip content="Ghi chi tiêu">
              <Button variant="outline" size="icon">
                <HandCoins />
              </Button>
            </HoTaTooltip>
            <HoTaTooltip content="Ghi nợ">
              <Button variant="outline" size="icon">
                <BriefcaseBusiness />
              </Button>
            </HoTaTooltip>
            <HoTaTooltip content="Ghi có">
              <Button variant="outline" size="icon">
                <BriefcaseBusiness />
              </Button>
            </HoTaTooltip>
          </div>
          <Suspense
            fallback={
              <DataTableSkeleton
                columnCount={6}
                searchableColumnCount={1}
                filterableColumnCount={2}
                cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem", "8rem"]}
                shrinkZero
              />
            }
          >
            <TransactionTable filter={defaultFilter} />
          </Suspense>
        </Card>
      </div>
    </HydrateClient>
  );
};

export default TransactionsPage;
