import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { IAIProvider } from './ai-provider.interface';

/**
 * Adapter for Google's Gemini AI
 */
@Injectable()
export class GeminiAdapter implements IAIProvider {
  private apiKey: string;
  private modelId: string;

  constructor(apiKey: string, modelId: string = 'gemini-2.5-flash') {
    this.apiKey = apiKey;
    this.modelId = modelId;
  }

  async sendMessage(prompt: string): Promise<string> {
    const configuration = new GoogleGenerativeAI(this.apiKey);
    const model = configuration.getGenerativeModel({ model: this.modelId });
    const chat = model.startChat();
    
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    
    return response.text();
  }

  getProviderName(): string {
    return 'Gemini';
  }
}
