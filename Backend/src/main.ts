import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // 👈 your frontend port
    credentials: true,
  });

  await app.listen(5000); // 👈 your backend port
}
bootstrap();
