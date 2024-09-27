// src/weather/weather.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Ensure this is imported

@Controller('weather')
@UseGuards(JwtAuthGuard) // Use the JwtAuthGuard to protect this controller
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query('city') city: string) {
    if (!city) {
      throw new Error('City parameter is required');
    }
    return this.weatherService.getWeather(city);
  }
}
