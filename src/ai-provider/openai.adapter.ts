import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { IAIProvider } from './ai-provider.interface';

/**
 * Adapter for OpenAI's ChatGPT
 */
@Injectable()
export class OpenAIAdapter implements IAIProvider {
  private client: OpenAI;
  private model: string;

  constructor(apiKey: string, model: string = 'gpt-4o-mini') {
    this.client = new OpenAI({
      apiKey: apiKey,
    });
    this.model = model;
  }

  async sendMessage(prompt: string): Promise<string> {
    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return completion.choices[0].message.content || '';
  }

  getProviderName(): string {
    return 'OpenAI';
  }
}
