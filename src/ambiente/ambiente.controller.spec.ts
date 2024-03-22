import { Test, TestingModule } from '@nestjs/testing';
import { AmbienteController } from './ambiente.controller';
import { AmbienteService } from './ambiente.service';

describe('AmbienteController', () => {
  let controller: AmbienteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmbienteController],
      providers: [AmbienteService],
    }).compile();

    controller = module.get<AmbienteController>(AmbienteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
