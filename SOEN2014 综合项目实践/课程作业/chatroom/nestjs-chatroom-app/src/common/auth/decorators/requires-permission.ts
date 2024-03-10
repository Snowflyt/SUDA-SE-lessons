import * as R from 'ramda';

import { Requires } from './requires';

import type { RequiresDecorator } from './requires';

export const RequiresPermission = (permissionName: string): RequiresDecorator =>
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
    return userPermissionNames.includes(permissionName);
  });
