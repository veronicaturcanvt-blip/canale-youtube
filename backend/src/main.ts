import 'reflect-metadata';
import { json, raw } from 'express';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

const STRIPE_WEBHOOK_PATH = '/subscriptions/webhooks/stripe';
const MUX_WEBHOOK_PATH = '/webhooks/mux';

async function bootstrap() {
  // Stripe and Mux webhook signatures are both computed over the exact raw
  // request bytes, so those two routes need the unparsed body while every
  // other route still wants normal JSON parsing.
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });
  app.use(STRIPE_WEBHOOK_PATH, raw({ type: 'application/json' }));
  app.use(MUX_WEBHOOK_PATH, raw({ type: 'application/json' }));
  app.use(json());
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
