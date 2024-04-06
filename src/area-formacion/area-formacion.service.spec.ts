import { Test, TestingModule } from '@nestjs/testing'
import { AreaFormacionService } from './area-formacion.service'

describe('AreaFormacionService', () => {
    let service: AreaFormacionService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AreaFormacionService],
        }).compile()

        service = module.get<AreaFormacionService>(AreaFormacionService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
