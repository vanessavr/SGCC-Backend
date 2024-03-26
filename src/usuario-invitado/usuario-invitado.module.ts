import { Module } from '@nestjs/common'
import { UsuarioInvitadoService } from './usuario-invitado.service'
import { UsuarioInvitadoController } from './usuario-invitado.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
    controllers: [UsuarioInvitadoController],
    providers: [UsuarioInvitadoService],
    imports: [PrismaModule],
})
export class UsuarioInvitadoModule {}
