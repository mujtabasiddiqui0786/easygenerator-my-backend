// src/weather/weather.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private apiKey = process.env.WEATHER_API_KEY;
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  async getWeather(city: string) {
    try {
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
      throw new HttpException('City not found', HttpStatus.NOT_FOUND);
    }
  }
}
