import {
    Get,
    Post,
    Body,
    Put,
    Delete,
    Query,
    Param,
    Controller,
    Req,
    Res,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly ReviewsService: ReviewsService) { }

    @Post('suggestions')
    async getReviewSuggestions(@Req() req, @Res() res) {
        const { prompt } = req.body;

        const reviews = await this.ReviewsService.generateReviews(prompt);
        console.log(reviews);

        return res.status(200).json({ message: reviews });
    }
}
