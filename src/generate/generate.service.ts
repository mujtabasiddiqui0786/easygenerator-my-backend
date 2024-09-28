// src/generate/generate.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class GenerateService {
  private openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'), // Ensure your OpenAI API key is correct
    });
  }

  async generateResponse(prompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Use the chat model gpt-3.5-turbo
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' }, // Optional system message
        { role: 'user', content: prompt }, // User message
      ],
      max_tokens: 150,
    });

    return response.choices[0].message.content.trim();
  }
}
