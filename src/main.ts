import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  console.log("FRONTEND_URL = ", configService.get<string>('FRONTEND_URL'));
  app.enableCors({
    // origin: configService.get<string>('FRONTEND_URL') || 'http://localhost:3000', // Replace with your React app's URL
    origin: '*', // Allows all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
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