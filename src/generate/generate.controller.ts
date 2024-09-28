// src/generate/generate.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { GenerateService } from './generate.service';

@Controller('generate')
export class GenerateController {
  constructor(private readonly generateService: GenerateService) {}

  @Post()
  async generate(@Body('prompt') prompt: string): Promise<{ output: string }> {
    const output = await this.generateService.generateResponse(prompt);
    return { output };
  }
}
