import { Requires } from './requires';

import type { RequiresDecorator } from './requires';

export interface RequiresRolesOptions {
  logicalOperator?: 'AND' | 'OR';
}

export const RequiresRoles = (
  roleNames: string[],
  options: RequiresRolesOptions = {
    logicalOperator: 'AND',
  },
): RequiresDecorator =>
  Requires((userInfo) =>
    options.logicalOperator === 'AND'
      ? userInfo.roleNames.every((roleName) => roleNames.includes(roleName))
      : userInfo.roleNames.some((roleName) => roleNames.includes(roleName)),
  );
