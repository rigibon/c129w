import { Module, Global } from '@nestjs/common';
import { AIProviderService } from './ai-provider.service';

/**
 * Global module that provides AI services across the application
 */
@Global()
@Module({
  providers: [AIProviderService],
  exports: [AIProviderService],
})
export class AIProviderModule {}
