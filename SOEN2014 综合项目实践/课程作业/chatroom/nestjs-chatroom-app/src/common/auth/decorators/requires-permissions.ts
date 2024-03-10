import * as R from 'ramda';

import { Requires } from './requires';

import type { RequiresDecorator } from './requires';

export interface RequiresPermissionsOptions {
  logicalOperator?: 'AND' | 'OR';
}

export const RequiresPermissions = (
  permissionNames: string[],
  options: RequiresPermissionsOptions = {
    logicalOperator: 'AND',
  },
): RequiresDecorator =>
  Requires(async (userInfo, _1, _2, cacheManager) => {
    const userPermissionNames = R.uniq(
      (
        await Promise.all(
          userInfo.roleNames
            .map((roleName) => `role:${roleName}:permissions`)
            .map(async (key) => await cacheManager.get<string[]>(key)),
        )
      ).flat(),
    );
    return options.logicalOperator === 'AND'
      ? permissionNames.every((permissionName) => userPermissionNames.includes(permissionName))
      : permissionNames.some((permissionName) => userPermissionNames.includes(permissionName));
  });
