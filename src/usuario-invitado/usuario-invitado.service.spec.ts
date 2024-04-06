import { Test, TestingModule } from '@nestjs/testing'
import { UsuarioInvitadoService } from './usuario-invitado.service'

describe('UsuarioInvitadoService', () => {
    let service: UsuarioInvitadoService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsuarioInvitadoService],
        }).compile()

        service = module.get<UsuarioInvitadoService>(UsuarioInvitadoService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
