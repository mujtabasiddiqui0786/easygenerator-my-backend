// src/weather/weather.module.ts
import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  // imports: [AuthModule],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
