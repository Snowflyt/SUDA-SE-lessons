import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
