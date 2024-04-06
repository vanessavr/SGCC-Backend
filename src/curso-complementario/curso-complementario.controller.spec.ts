import { Test, TestingModule } from '@nestjs/testing'
import { CursoComplementarioController } from './curso-complementario.controller'
import { CursoComplementarioService } from './curso-complementario.service'

describe('CursoComplementarioController', () => {
    let controller: CursoComplementarioController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CursoComplementarioController],
            providers: [CursoComplementarioService],
        }).compile()

        controller = module.get<CursoComplementarioController>(CursoComplementarioController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
