import { transactionsPath } from '@app/routes';
import type { NavigationInfo } from '@shared/types/navigation-info';

export const navigationItems: Array<NavigationInfo> = [
  {
    name: 'Quản lý chi tiêu',
    path: transactionsPath,
    shortName: 'Tài xế',
    icon: 'i-solar-user-hand-up-bold-duotone'
  }
];
