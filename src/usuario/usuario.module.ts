import { Module } from '@nestjs/common'
import { UsuarioService } from './usuario.service'
import { UsuarioController } from './usuario.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { CursoComplementarioService } from 'src/curso-complementario/curso-complementario.service'

@Module({
    controllers: [UsuarioController],
    providers: [UsuarioService, CursoComplementarioService],
    imports: [PrismaModule],
})
export class UsuarioModule {}
