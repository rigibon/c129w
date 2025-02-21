import { Test, TestingModule } from '@nestjs/testing';
import { CreativeController } from './creative.controller';

describe('CreativeController', () => {
  let controller: CreativeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreativeController],
    }).compile();

    controller = module.get<CreativeController>(CreativeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
