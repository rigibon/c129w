import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class ReviewsService {
    async generateReviews(prompt: string): Promise<string> {
        try {
            const API_KEY = process.env.API_KEY;
            const configuration = new GoogleGenerativeAI(API_KEY);

            const modelId = 'gemini-2.5-flash';
            const model = configuration.getGenerativeModel({ model: modelId });

            const chat = model.startChat();

            const result = await chat.sendMessage(prompt);

            const response = await result.response;

            return response.text();
        } catch (error) {
            console.error('Error generating reviews:', error);
            throw error;
        }
    }
}