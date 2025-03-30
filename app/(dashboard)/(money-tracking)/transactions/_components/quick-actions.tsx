"use client";

import { HoTaTooltip } from "@/components/shared/hota-tooltip";
import { Button } from "@/components/ui/button";
import { transactionCategoryPath } from "@/lib/constants/routes";
import { BriefcaseBusiness, HandCoins } from "lucide-react";
import Link from "next/link";

export const TransactionQuickActions = () => {
  return (
    <div className="flex items-center justify-end p-2 gap-2">
      <HoTaTooltip content="Ghi chi tiêu">
        <Button variant="outline" size="icon">
          <HandCoins />
        </Button>
      </HoTaTooltip>
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
