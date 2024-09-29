// src/health/health.controller.ts
import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/public.decorator';

@Controller('health')
export class HealthController {
    @Get()
    @Public()
    getHealthStatus(): { status: string } {
      return { status: 'Backend is healthy' };
    }
}
