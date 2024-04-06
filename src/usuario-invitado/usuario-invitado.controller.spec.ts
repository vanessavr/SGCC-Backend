import { Test, TestingModule } from '@nestjs/testing'
import { UsuarioInvitadoController } from './usuario-invitado.controller'
import { UsuarioInvitadoService } from './usuario-invitado.service'

describe('UsuarioInvitadoController', () => {
    let controller: UsuarioInvitadoController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsuarioInvitadoController],
            providers: [UsuarioInvitadoService],
        }).compile()

        controller = module.get<UsuarioInvitadoController>(UsuarioInvitadoController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
