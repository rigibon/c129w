import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';

@Injectable()
export class CreatorService {
  generateHtml(input: any): string {
    const templatePath = path.join(__dirname, '..', 'client', 'renewal.html.hbs');
    const dataPath = path.join(__dirname, '..', 'client', 'renewal.json');
    const outputPath = path.join(__dirname, '..', 'client', 'renewal', 'output.html');

    const templateFile = fs.readFileSync(templatePath, 'utf-8');

    const dataFile = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(dataFile);

    const keywords = { ...data, ...input }

    const template = Handlebars.compile(templateFile);

    const html = template(keywords);

    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, html, 'utf-8');

    return html;
  }
}
