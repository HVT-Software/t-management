import { customerApiRouter } from '@modules/customer/customer.api';
import { driverApiRouter } from '@modules/driver/driver.api';
import { vehicleApiRouter } from '@modules/vehicle/vehicle.api';
import { warehouseApiRouter } from '@modules/warehouse/warehouse.api';
import type { inferRouterOutputs } from '@trpc/server';

import { baseRouter } from './init';

export const apiRouter = baseRouter({
  customer: customerApiRouter,
  driver: driverApiRouter,
  warehouse: warehouseApiRouter,
  vehicle: vehicleApiRouter
});

export type ApiRouter = typeof apiRouter;
export type ApiRouterOutput = inferRouterOutputs<ApiRouter>;
