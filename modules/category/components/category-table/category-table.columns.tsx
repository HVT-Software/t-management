import { Category } from '@modules/category/models/category';
import { DateTimeDisplay } from '@shared/components/date-time-display';
import { MRT_ColumnDef } from 'material-react-table';

export const categoryColumns: Array<MRT_ColumnDef<Category>> = [
  {
    header: 'Ngày tạo',
    accessorKey: 'createdAt',
    id: 'CreatedDate',
    Cell: ({ row }) => <DateTimeDisplay value={row.original.createdAt} />,
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
    Cell: ({ renderedCellValue }) => renderedCellValue,
    muiTableBodyCellProps: {
      align: 'right'
    }
  },
  {
    header: 'Còn lại',
    accessorKey: 'remaining',
    Cell: ({ renderedCellValue }) => renderedCellValue,
    muiTableBodyCellProps: {
      align: 'right'
    }
  }
];
