import { Delete } from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { SquarePen } from 'lucide-react';
import { MRT_Row, MRT_RowData, MRT_TableInstance } from 'material-react-table';

interface RenderRowActionProps<TData extends MRT_RowData> {
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
  xoa?: (id: string) => Promise<void>;
}

export const RowAction = <TData extends MRT_RowData>({ row, table, xoa }: RenderRowActionProps<TData>) => {
  return (
    <ToggleButtonGroup size='small' exclusive>
      <Tooltip title='Chỉnh sửa' arrow>
        <ToggleButton value='edit' onClick={() => table.setEditingRow(row)} className='!border-none'>
          <SquarePen className='size-4 cursor-pointer text-blue-400' />
        </ToggleButton>
      </Tooltip>
      {xoa && <Tooltip title='Xóa' arrow>
        <ToggleButton value='delete' onClick={() => xoa(row.id)} className='!border-none'>
          <Delete className='!size-5 cursor-pointer text-red-400' />
        </ToggleButton>
      </Tooltip>}
    </ToggleButtonGroup>
  );
};
