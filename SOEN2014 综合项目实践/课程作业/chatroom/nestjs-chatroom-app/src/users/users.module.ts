import { Module, forwardRef } from '@nestjs/common';

import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

import { AuthModule } from '@/common/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
