import { Controller, Get, Req, Res } from '@nestjs/common';
import { response, Response } from 'express';
import { CreatorService } from './creator.service';
import * as dotenv from "dotenv";
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

@Controller("creator")
export class CreatorController {
    constructor(private readonly creatorService: CreatorService) {}

    @Get('/generate-index')
    async generateIndex(@Req() req: Request, @Res() res: Response): Promise<void> {
        const data = { 
            brand: "CVS CarePass", 
            firstLogo: "logo1.png", 
            secondLogo: "logo2.jpg", 
            favicon: "favicon.jpg", 
            mainColor: "rgb(238, 0, 0)", 
            folderName: "us-carewall",
            text04: "Enjoy unlimited movies, TV shows, and more with your subscription.",
            wallID: "a4d656a7-091f-4126-a066-81e252440a7d"
        };

        const comments = [
            "This was awesome! My Costco membership expired, but then I saw I could renew it for free for 90 days. The only catch was picking a renewal reward, so I went with that awesome cast iron dutch oven for my boyfriend. I just had to pay for shipping and handling. Totally worth it – he loved it, and we get to shop at Costco again! He’s already asking if there’s another way we can renew like this again.",
            "I was about to miss out on my Costco bulk buys since my membership ran out, but this offer popped up where I could renew for 90 days for free! All I had to do was pick a reward and pay for the shipping. I chose that fancy coffee maker for my friend. He loves it, and I’m back to stocking up at Costco – pretty solid deal!",
            "Nice, James! I did the same for my mom when her Costco membership expired last week. She’s been wanting that robot vacuum for a while, but it was too expensive, so I picked it as the renewal reward. Paid the shipping, and boom – Costco for 90 days! My mom’s happy, I’m happy, and now I’m thinking of doing the same when mine runs out.",
            "Haha, yeah, my wife got this same offer! Our Costco membership expired, and she jumped on the chance to renew for 90 days. I was a little skeptical, but after she picked that amazing stand mixer as her reward and paid the shipping fee, our membership was back active two days later. Looks like we’re covered for now, and she’s happy with the mixer!",
            "I was freaking out when my Costco membership expired, but then my friend told me about this 90-day free renewal deal. You just have to pick a renewal reward and pay for shipping. I saw those noise-cancelling headphones my friend has been raving about, so I chose those as my reward. Paid for the shipping, and now I have Costco for 90 days again – and a product I’ve been wanting to try!"
        ]

        const newComments = await this.generateComments(data.brand, comments);

        const labeledComments = newComments.reduce((acc, comment, index) => {
            acc[`comment${index + 1}`] = comment;
            return acc;
        }, {});

        data.text04 = await this.adjustText(data.brand, data.text04);

        const input = { ...data, ...labeledComments }

        const html = this.creatorService.generateHtml(input);
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    }

    async adjustText(brand, text) {
        const config = new GoogleGenerativeAI(process.env.API_KEY);

        const modelId = "gemini-1.5-flash";
        const model = config.getGenerativeModel({ model: modelId });

        const chat = model.startChat();

        const result = await chat.sendMessage(`Adapt this subtitle to fit ${brand}, the output must be ONLY the modified text: ${text}`);

        const response = await result.response;

        return response.text();
    }

    async generateComments(brand: string, comments): Promise<string[]> {
        const config = new GoogleGenerativeAI(process.env.API_KEY);

        const modelId = "gemini-1.5-flash";
        const model = config.getGenerativeModel({ model: modelId });

        const chat = model.startChat();

        const productList = ["Portable Vacuum", "Dash-Cam with Night-Vision", "Robot Vacuum Cleaner", "Smart Watch", "Pressure Washer", "Camera", "Doorbell"]

        const promises = comments.map(async (comment, index) => {
            const result = await chat.sendMessage(`Adapt this comment to ${brand}, the output must be ONLY the comment modified to fit that brand, USE THIS PRODUCT ${productList[index]}, don't write it inside parenthesis nor brackets, here is the comment to modify: ${comment}`);

            const response = await result.response;

            return response.text();
        });
          
        comments = await Promise.all(promises);

        return comments;
    }
}
