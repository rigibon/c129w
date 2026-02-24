import { Injectable } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';
import { IAIProvider } from './ai-provider.interface';

/**
 * Adapter for Anthropic Claude (Free trial credits available)
 * High-quality responses with good reasoning capabilities
 */
@Injectable()
export class AnthropicAdapter implements IAIProvider {
  private client: Anthropic;
  private model: string;

  constructor(apiKey: string, model: string = 'claude-3-5-haiku-20241022') {
    this.client = new Anthropic({
      apiKey: apiKey,
    });
    this.model = model;
  }

  async sendMessage(prompt: string): Promise<string> {
    const message = await this.client.messages.create({
      model: this.model,
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extract text from content blocks
    const textContent = message.content
      .filter((block) => block.type === 'text')
      .map((block) => (block as any).text)
      .join('');

    return textContent;
  }

  getProviderName(): string {
    return 'Anthropic Claude';
  }
}
