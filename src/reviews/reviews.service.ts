import { Injectable } from '@nestjs/common';
import { AIProviderService } from '../ai-provider/ai-provider.service';

@Injectable()
export class ReviewsService {
    constructor(private readonly aiProvider: AIProviderService) {}

    async generateReviews(prompt: string): Promise<string> {
        try {
            return await this.aiProvider.sendMessage(prompt);
        } catch (error) {
            console.error('Error generating reviews:', error);
            throw error;
        }
    }
}