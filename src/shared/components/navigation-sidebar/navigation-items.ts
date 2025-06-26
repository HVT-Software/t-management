import { categoriesPath, transactionsPath } from '@app/routes';
import type { NavigationInfo } from '@shared/types/navigation-info';

export const navigationItems: Array<NavigationInfo> = [
  {
    name: 'Quản lý chi tiêu',
    path: transactionsPath,
    shortName: 'Chi tiêu',
    icon: 'i-solar-user-hand-up-bold-duotone',
    children: [
      {
        name: 'Danh sách giao dịch',
        path: transactionsPath,
        shortName: 'Giao dịch',
        icon: 'i-solar-user-hand-up-bold-duotone'
      },
      {
        name: 'Danh sách danh mục',
        path: categoriesPath,
        shortName: 'Danh mục',
        icon: 'i-solar-user-hand-up-bold-duotone'
      }
    ]
  }
];
