import { Injectable } from '@nestjs/common';
import { IAIProvider } from './ai-provider.interface';
import { GeminiAdapter } from './gemini.adapter';
import { OpenAIAdapter } from './openai.adapter';
import { GroqAdapter } from './groq.adapter';
import { AnthropicAdapter } from './anthropic.adapter';
import { CohereAdapter } from './cohere.adapter';

/**
 * Service that provides the appropriate AI provider based on configuration
 * This is a factory pattern that allows easy switching between AI providers
 */
@Injectable()
export class AIProviderService {
  private provider: IAIProvider;

  constructor() {
    this.provider = this.createProvider();
  }

  /**
   * Creates and returns the appropriate AI provider based on environment variables
   */
  private createProvider(): IAIProvider {
    const providerType = process.env.AI_PROVIDER || 'gemini'; // Default to gemini
    
    switch (providerType.toLowerCase()) {
      case 'openai':
      case 'chatgpt':
      case 'gpt':
        const openaiKey = process.env.GPT_API_KEY;
        if (!openaiKey) {
          throw new Error('GPT_API_KEY is required when using OpenAI provider');
        }
        const openaiModel = process.env.OPENAI_MODEL || 'gpt-4o-mini';
        console.log(`🤖 AI Provider: OpenAI (${openaiModel})`);
        return new OpenAIAdapter(openaiKey, openaiModel);
      
      case 'groq':
        const groqKey = process.env.GROQ_API_KEY;
        if (!groqKey) {
          throw new Error('GROQ_API_KEY is required when using Groq provider');
        }
        const groqModel = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
        console.log(`🤖 AI Provider: Groq (${groqModel}) - FREE`);
        return new GroqAdapter(groqKey, groqModel);
      
      case 'anthropic':
      case 'claude':
        const anthropicKey = process.env.ANTHROPIC_API_KEY;
        if (!anthropicKey) {
          throw new Error('ANTHROPIC_API_KEY is required when using Anthropic provider');
        }
        const anthropicModel = process.env.ANTHROPIC_MODEL || 'claude-3-5-haiku-latest';
        console.log(`🤖 AI Provider: Anthropic Claude (${anthropicModel})`);
        return new AnthropicAdapter(anthropicKey, anthropicModel);
      
      case 'cohere':
        const cohereKey = process.env.COHERE_API_KEY;
        if (!cohereKey) {
          throw new Error('COHERE_API_KEY is required when using Cohere provider');
        }
        const cohereModel = process.env.COHERE_MODEL || 'command-r';
        console.log(`🤖 AI Provider: Cohere (${cohereModel}) - FREE`);
        return new CohereAdapter(cohereKey, cohereModel);
      
      case 'gemini':
      case 'google':
      default:
        const geminiKey = process.env.API_KEY;
        if (!geminiKey) {
          throw new Error('API_KEY is required when using Gemini provider');
        }
        const geminiModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
        console.log(`🤖 AI Provider: Gemini (${geminiModel}) - FREE with limits`);
        return new GeminiAdapter(geminiKey, geminiModel);
    }
  }

  /**
   * Get the current AI provider instance
   */
  getProvider(): IAIProvider {
    return this.provider;
  }

  /**
   * Send a message to the AI provider
   */
  async sendMessage(prompt: string): Promise<string> {
    return this.provider.sendMessage(prompt);
  }

  /**
   * Get the name of the current provider
   */
  getProviderName(): string {
    return this.provider.getProviderName();
  }
}
