import { Requires } from './requires';

import type { RequiresDecorator } from './requires';

export const RequiresRole = (roleName: string): RequiresDecorator =>
  Requires((userInfo) => userInfo.roleNames.includes(roleName));
