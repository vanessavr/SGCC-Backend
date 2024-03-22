import { Module } from '@nestjs/common'
import { PerfilService } from './perfil.service'
import { PerfilController } from './perfil.controller'
import { UsuarioService } from 'src/usuario/usuario.service'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
    controllers: [PerfilController],
    providers: [PerfilService, UsuarioService],
    imports: [PrismaModule],
})
export class PerfilModule {}
