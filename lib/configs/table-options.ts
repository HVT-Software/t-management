import { TableOptions } from "@tanstack/react-table";

export const tableOptions: Partial<TableOptions<any>> = {
  columnResizeMode: "onChange",
  defaultColumn: {
    minSize: 100
  }
};
