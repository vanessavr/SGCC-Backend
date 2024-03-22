import { Test, TestingModule } from '@nestjs/testing';
import { ListasController } from './listas.controller';
import { ListasService } from './listas.service';

describe('ListasController', () => {
  let controller: ListasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListasController],
      providers: [ListasService],
    }).compile();

    controller = module.get<ListasController>(ListasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
