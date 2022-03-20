import { Test, TestingModule } from '@nestjs/testing';
import { ViewCounterController } from './view-counter.controller';

describe('ViewCounterController', () => {
  let controller: ViewCounterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViewCounterController],
    }).compile();

    controller = module.get<ViewCounterController>(ViewCounterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
