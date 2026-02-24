import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';
import { IAIProvider } from './ai-provider.interface';

/**
 * Adapter for Groq AI (Free tier available)
 * Very fast inference with generous free tier
 */
@Injectable()
export class GroqAdapter implements IAIProvider {
  private client: Groq;
  private model: string;

  constructor(apiKey: string, model: string = 'llama-3.3-70b-versatile') {
    this.client = new Groq({
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
      temperature: 0.7,
    });

    return completion.choices[0].message.content || '';
  }

  getProviderName(): string {
    return 'Groq';
  }
}
