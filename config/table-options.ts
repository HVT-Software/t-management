import {
  DensityMediumRounded,
  DensitySmallRounded,
  FilterListOffRounded,
  FilterListRounded
} from '@mui/icons-material';
import NoRecordView from '@shared/components/no-record-view';
import type { MRT_Localization, MRT_TableOptions } from 'material-react-table';
import { createElement } from 'react';

export const localization: MRT_Localization = {
  actions: 'Thao tác',
  and: 'và',
  cancel: 'Hủy',
  clearSort: 'Bỏ sắp xếp',
  clearFilter: 'Bỏ lọc',
  changeFilterMode: 'Đổi độ lọc',
  changeSearchMode: 'Đổi chế độ tìm kiếm',
  clearSearch: 'Hủy tìm kiếm',
  clearSelection: 'Bỏ chọn',
  clickToCopy: 'Nhấn để sao chép',
  collapse: 'Thu gọn',
  collapseAll: 'Thu gọn tất cả',
  columnActions: 'Thao tác cột',
  copiedToClipboard: 'Đã sao chép vào bộ nhớ tạm',
  copy: 'Sao chép',
  dropToGroupBy: 'Kéo vào đây để nhóm theo cột này',
  edit: 'Sửa',
  expand: 'Mở rộng',
  expandAll: 'Mở rộng tất cả',
  filterArrIncludes: 'Lọc mảng',
  filterArrIncludesAll: 'Lọc mảng chứa tất cả',
  filterArrIncludesSome: 'Lọc mảng chứa ít nhất một',
  filterBetween: 'Lọc trong khoảng',
  filterBetweenInclusive: 'Lọc trong khoảng bao gồm',
  filterByColumn: 'Lọc theo cột',
  filterContains: 'Bao gồm',
  filterEmpty: 'Rỗng',
  filterEndsWith: 'Kết thúc bằng',
  filterEquals: 'Bằng',
  filterEqualsString: 'Bằng',
  filterFuzzy: 'Tương đối',
  filterGreaterThan: 'Lớn hơn',
  filterGreaterThanOrEqualTo: 'Lớn hơn hoặc bằng',
  filterInNumberRange: 'Trong khoảng',
  filterIncludesString: 'Bao gồm',
  filterIncludesStringSensitive: 'Bao gồm (không phân biệt chữ hoa chữ thường)',
  filterLessThan: 'Nhỏ hơn',
  filterLessThanOrEqualTo: 'Nhỏ hơn hoặc bằng',
  filterMode: 'Chế độ lọc',
  filterNotEmpty: 'Không rỗng',
  filterNotEquals: 'Khác',
  filterStartsWith: 'Bắt đầu bằng',
  filterWeakEquals: 'Bằng (yếu)',
  filteringByColumn: 'Lọc theo cột',
  goToFirstPage: 'Trang đầu',
  goToLastPage: 'Trang cuối',
  goToNextPage: 'Trang sau',
  goToPreviousPage: 'Trang trước',
  grab: 'Kéo',
  groupByColumn: 'Nhóm theo cột',
  groupedBy: 'Đã nhóm theo',
  hideAll: 'Ẩn tất cả',
  hideColumn: 'Ẩn cột',
  max: 'Tối đa',
  min: 'Tối thiểu',
  move: 'Di chuyển',
  noRecordsToDisplay: 'Không có dữ liệu để hiển thị',
  noResultsFound: 'Không tìm thấy kết quả',
  of: 'của',
  or: 'hoặc',
  pin: 'Ghim',
  pinToLeft: 'Ghim trái',
  pinToRight: 'Ghim phải',
  resetColumnSize: 'Khôi phục kích thước cột',
  resetOrder: 'Khôi phục thứ tự',
  rowActions: 'Thao tác dòng',
  rowNumber: 'STT',
  rowNumbers: 'STT',
  rowsPerPage: 'Số dòng mỗi trang',
  save: 'Lưu',
  search: 'Tìm kiếm',
  select: 'Chọn',
  selectedCountOfRowCountRowsSelected: 'Số dòng đã chọn',
  showAll: 'Hiển thị tất cả',
  showAllColumns: 'Hiển thị tất cả cột',
  showHideColumns: 'Hiển thị/Ẩn cột',
  showHideFilters: 'Hiển thị/Ẩn bộ lọc',
  showHideSearch: 'Hiển thị/Ẩn tìm kiếm',
  sortByColumnAsc: 'Sắp xếp tăng dần',
  sortByColumnDesc: 'Sắp xếp giảm dần',
  sortedByColumnAsc: 'Đã sắp xếp tăng dần',
  sortedByColumnDesc: 'Đã sắp xếp giảm dần',
  thenBy: 'sau đó theo',
  toggleDensity: 'Thay đổi kích thước bảng',
  toggleFullScreen: 'Chuyển đổi toàn màn hình',
  toggleSelectAll: 'Chọn tất cả',
  toggleSelectRow: 'Chọn dòng',
  toggleVisibility: 'Chuyển đổi hiển thị',
  ungroupByColumn: 'Bỏ nhóm theo cột',
  unpin: 'Bỏ ghim',
  unpinAll: 'Bỏ ghim tất cả',
  language: 'vi'
};

export const tableOptions: Partial<MRT_TableOptions<any>> = {
  paginationDisplayMode: 'pages',
  muiPaginationProps: {
    variant: 'soft',
    shape: 'rounded',
    color: 'primary'
  },
  manualPagination: true,
  manualFiltering: true,
  manualSorting: true,
  enableSorting: false,
  enableMultiSort: false,
  enableGlobalFilter: false,
  localization: localization,
  renderEmptyRowsFallback: () => createElement(NoRecordView),
  muiTableContainerProps: {
    className: 'overflow-x-auto'
  },
  icons: {
    DensitySmallIcon: () =>
      createElement(DensitySmallRounded, {
        fontSize: 'small'
      }),
    DensityMediumIcon: () =>
      createElement(DensityMediumRounded, {
        fontSize: 'small'
      }),
    DensityLargeIcon: () =>
      createElement(DensityMediumRounded, {
        fontSize: 'small'
      }),
    ViewColumnIcon: () =>
      createElement('span', {
        className: 'i-mingcute-column-fill h-5 w-5'
      }),
    FilterListIcon: () => createElement(FilterListRounded, { fontSize: 'small' }),
    FilterListOffIcon: () => createElement(FilterListOffRounded, { fontSize: 'small' })
  },
  displayColumnDefOptions: {
    'mrt-row-expand': {
      header: '',
      size: 60,
      maxSize: 60,
      minSize: 60
    },
    'mrt-row-select': {
      header: '',
      size: 40,
      maxSize: 40,
      minSize: 40
    }
  },
  mrtTheme: {
    baseBackgroundColor: '#fffff'
  },
  defaultColumn: {
    muiColumnActionsButtonProps: {
      size: 'small'
    }
  }
};
