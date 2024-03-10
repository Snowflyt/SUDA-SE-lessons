import { SetMetadata } from '@nestjs/common';

import type { CustomDecorator } from '@nestjs/common';

export const SkipAuth = (): CustomDecorator<string> => SetMetadata('skipAuth', true);
