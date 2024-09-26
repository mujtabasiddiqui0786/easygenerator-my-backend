// src/app.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('app')
export class AppController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getApplication() {
    return { message: 'Welcome to the application.' };
  }
}
