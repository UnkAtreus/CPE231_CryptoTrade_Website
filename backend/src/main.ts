import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OrderResolver } from './order/order.resolver';
import { TestResolver } from './test/test.resolver';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const t = new TestResolver();
  // t.handleInterval();
  await app.listen(5000);
}
bootstrap();
