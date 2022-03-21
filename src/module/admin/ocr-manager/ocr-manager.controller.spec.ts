import { Test, TestingModule } from '@nestjs/testing';
import { OcrManagerController } from './ocr-manager.controller';

describe('OcrManagerController', () => {
  let controller: OcrManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OcrManagerController],
    }).compile();

    controller = module.get<OcrManagerController>(OcrManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
