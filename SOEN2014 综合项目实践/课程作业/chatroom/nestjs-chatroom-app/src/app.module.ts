import { Module } from '@nestjs/common';

import { ChatroomsModule } from './chatrooms/chatrooms.module';
import { CommonModule } from './common/common.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CommonModule, UsersModule, RolesModule, PermissionsModule, ChatroomsModule],
})
export class AppModule {}
