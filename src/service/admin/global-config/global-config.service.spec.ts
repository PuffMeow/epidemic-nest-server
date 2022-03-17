import { Test, TestingModule } from '@nestjs/testing';
import { GlobalConfigService } from './global-config.service';

describe('GlobalConfigService', () => {
  let service: GlobalConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalConfigService],
    }).compile();

    service = module.get<GlobalConfigService>(GlobalConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
