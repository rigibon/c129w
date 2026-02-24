import { Injectable } from '@nestjs/common';
import { CohereClient } from 'cohere-ai';
import { IAIProvider } from './ai-provider.interface';

/**
 * Adapter for Cohere AI (Free tier available)
 * Good for generation and embeddings
 */
@Injectable()
export class CohereAdapter implements IAIProvider {
  private client: CohereClient;
  private model: string;

  constructor(apiKey: string, model: string = 'command-r') {
    this.client = new CohereClient({
      token: apiKey,
    });
    this.model = model;
  }

  async sendMessage(prompt: string): Promise<string> {
    const response = await this.client.chat({
      message: prompt,
      model: this.model,
    });

    return response.text || '';
  }

  getProviderName(): string {
    return 'Cohere';
  }
}
