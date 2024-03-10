import { Module } from '@nestjs/common';

import { ChatroomsResolver } from './chatrooms.resolver';

@Module({
  providers: [ChatroomsResolver],
})
export class ChatroomsModule {}
