"use client";

import { HoTaTooltip } from "@/components/shared/hota-tooltip";
import { Button } from "@/components/ui/button";
import { transactionCategoryPath } from "@/lib/constants/routes";
import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import { QuickEditTransactionDialog } from "./transaction-dialog";

export const TransactionQuickActions = () => {
  return (
    <div className="flex items-center justify-end py-2 gap-2">
      <QuickEditTransactionDialog
        onTransactionAdded={() => {
          /* Handle transaction added */
        }}
      />
      <HoTaTooltip content="Danh mục">
        <Button variant="outline" size="icon" asChild>
          <Link href={transactionCategoryPath}>
            <BriefcaseBusiness />
          </Link>
        </Button>
      </HoTaTooltip>
    </div>
  );
};
