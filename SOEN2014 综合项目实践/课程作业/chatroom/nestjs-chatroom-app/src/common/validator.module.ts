import { Global, Module } from '@nestjs/common';

import { Validator } from './validator/services/validator.service';

@Global()
@Module({
  providers: [Validator],
  exports: [Validator],
})
export class ValidatorModule {}
