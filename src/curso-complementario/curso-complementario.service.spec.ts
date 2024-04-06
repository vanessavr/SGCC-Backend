import { Test, TestingModule } from '@nestjs/testing'
import { CursoComplementarioService } from './curso-complementario.service'

describe('CursoComplementarioService', () => {
    let service: CursoComplementarioService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CursoComplementarioService],
        }).compile()

        service = module.get<CursoComplementarioService>(CursoComplementarioService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
