// src/weather/weather.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
  private apiKey: string;
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('WEATHER_API_KEY');
    if (!this.apiKey) {
      throw new Error('WEATHER_API_KEY is not defined in the environment variables');
    }
  }

  async getWeather(city: string) {
    try {
      console.log('reached getWeather');
      const response = await axios.get(this.baseUrl, {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric',
        },
      });

      const data = response.data;

      return {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
      };
    } catch (error) {
      // Optional: You can inspect error.response.status to provide more detailed messages
      throw new HttpException('City not found', HttpStatus.NOT_FOUND);
    }
  }
}
