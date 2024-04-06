import { Test, TestingModule } from '@nestjs/testing'
import { AreaFormacionController } from './area-formacion.controller'
import { AreaFormacionService } from './area-formacion.service'

describe('AreaFormacionController', () => {
    let controller: AreaFormacionController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AreaFormacionController],
            providers: [AreaFormacionService],
        }).compile()

        controller = module.get<AreaFormacionController>(AreaFormacionController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
