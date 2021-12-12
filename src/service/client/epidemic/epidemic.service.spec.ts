import { Test, TestingModule } from '@nestjs/testing';
import { EpidemicService } from './epidemic.service';

describe('EpidemicService', () => {
  let service: EpidemicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EpidemicService],
    }).compile();

    service = module.get<EpidemicService>(EpidemicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
