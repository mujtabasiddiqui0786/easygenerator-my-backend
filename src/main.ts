import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL') || 'http://localhost:3000', // Replace with your React app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  // Optional: Log incoming requests for debugging
  app.use((req, res, next) => {
    Logger.log(`Request: ${req.method} ${req.url}`, 'RequestLogger');
    next();
  });

  const port = configService.get<number>('PORT') || 5000;
  await app.listen(port, () => {
    Logger.log(`Server is running at http://localhost:${port}`, 'Bootstrap');
  });
}
bootstrap();