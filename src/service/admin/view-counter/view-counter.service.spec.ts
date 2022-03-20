import { Test, TestingModule } from '@nestjs/testing';
import { ViewCounterService } from './view-counter.service';

describe('ViewCounterService', () => {
  let service: ViewCounterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViewCounterService],
    }).compile();

    service = module.get<ViewCounterService>(ViewCounterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
