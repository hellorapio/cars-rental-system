import { NestFactory } from '@nestjs/core';
import { CouponsModule } from './coupons.module';

async function bootstrap() {
  const app = await NestFactory.create(CouponsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
