import { Module } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { LotteryModule } from './lottery/lottery.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CommonModule, UsersModule, RolesModule, PermissionsModule, LotteryModule],
})
export class AppModule {}
