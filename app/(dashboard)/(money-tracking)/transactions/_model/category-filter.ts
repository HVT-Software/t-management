import { ESortDirection } from "@lib/enums/sort-direction";
import { Category } from "@lib/models/category";
import "reflect-metadata";
import type { PascalCasedProperties } from "type-fest";

export class CategoryFilter implements Omit<ListRequest, "startDate" | "endDate"> {
  constructor(isAll = false) {
    if (isAll) {
      this.isAll = isAll;
    }
  }

  pageIndex: number = 0;

  pageSize: number = 15;

  isCount?: boolean = true;

  searchText: string = "";

  isAll?: boolean = false;

  sort: {
    direction: ESortDirection;
    propertyName: keyof PascalCasedProperties<Category> | string;
  } = {
    direction: ESortDirection.Descending,
    propertyName: "CreatedDate"
  };
}
