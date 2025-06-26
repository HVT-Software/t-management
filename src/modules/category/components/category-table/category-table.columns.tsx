import { CurrencyDisplay } from '@app/(authenticated)/_components/numeric-display';
import { Category } from '@modules/category/models/category';
import { DateTimeDisplay } from '@shared/components/date-time-display';
import { MRT_ColumnDef } from 'material-react-table';

export const categoryColumns: Array<MRT_ColumnDef<Category>> = [
  {
    header: 'Ngày tạo',
    accessorKey: 'createdAt',
    Cell: ({ row }) => <DateTimeDisplay value={row.original.createAt} />,
    maxSize: 80
  },
  {
    header: 'Tên danh mục',
    accessorKey: 'name',
    muiTableBodyCellProps: {
      className: 'whitespace-normal'
    },
    Cell: ({ renderedCellValue }) => <div className='line-clamp-3'>{renderedCellValue}</div>
  },
  {
    header: 'Mô tả',
    accessorKey: 'description',
    Cell: ({ renderedCellValue }) => renderedCellValue,
    muiTableBodyCellProps: {
      className: 'whitespace-normal'
    }
  },
  {
    header: 'Số tiền',
    accessorKey: 'budget',
    Cell: ({ row }) => <CurrencyDisplay value={row.original.budget} />,
    muiTableBodyCellProps: {
      align: 'right'
    }
  },
  {
    header: 'Còn lại',
    accessorKey: 'remaining',
    Cell: ({ row }) => <CurrencyDisplay value={row.original.remaining} />,
    muiTableBodyCellProps: {
      align: 'right'
    }
  }
];
