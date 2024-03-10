import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
};

void bootstrap();
