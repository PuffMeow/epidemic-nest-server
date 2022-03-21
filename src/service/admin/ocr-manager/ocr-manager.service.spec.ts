import { Test, TestingModule } from '@nestjs/testing';
import { OcrManagerService } from './ocr-manager.service';

describe('OcrManagerService', () => {
  let service: OcrManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OcrManagerService],
    }).compile();

    service = module.get<OcrManagerService>(OcrManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
