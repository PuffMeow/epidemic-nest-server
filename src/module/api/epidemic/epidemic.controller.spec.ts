import { Test, TestingModule } from '@nestjs/testing';
import { EpidemicController } from './epidemic.controller';

describe('EpidemicController', () => {
  let controller: EpidemicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EpidemicController],
    }).compile();

    controller = module.get<EpidemicController>(EpidemicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
