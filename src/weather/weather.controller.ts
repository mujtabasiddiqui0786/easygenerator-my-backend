// src/weather/weather.controller.ts
import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { WeatherService } from './weather.service';
// import { Public } from '../auth/public.decorator';

@Controller('weather') // This ensures the route is explicitly '/weather'
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  // @Public()
  @Get()
  async getWeather(@Query('city') city: string) {
    if (!city) {
      throw new BadRequestException('City parameter is required');
    }
    return this.weatherService.getWeather(city);
  }
}
