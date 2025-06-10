import { customerPath, driverPath, productPath, vehiclePath, vehicleRoutePath, warehousePath } from '@app/routes';
import type { NavigationInfo } from '@shared/types/navigation-info';

export const navigationItems: Array<NavigationInfo> = [
  {
    name: 'Quản lý tài xế',
    path: driverPath,
    shortName: 'Tài xế',
    icon: 'i-solar-user-hand-up-bold-duotone'
  },
  {
    name: 'Quản lý phương tiện',
    path: vehiclePath,
    shortName: 'Phương tiện',
    icon: 'i-solar-plain-3-bold-duotone'
  },
  {
    name: 'Quản lý khách hàng',
    path: customerPath,
    shortName: 'Khách hàng',
    icon: 'i-solar-users-group-rounded-bold-duotone'
  },
  {
    name: 'Quản lý kho',
    path: warehousePath,
    shortName: 'Kho',
    icon: 'i-solar-home-bold-duotone'
  },
  {
    name: 'Quản lý sản phẩm',
    path: productPath,
    shortName: 'Sản phẩm',
    icon: 'i-solar-box-minimalistic-bold-duotone'
  },
  {
    name: 'Quản lý tuyến xe',
    path: vehicleRoutePath,
    shortName: 'Tuyến xe',
    icon: 'i-solar-streets-navigation-bold-duotone'
  }
];
