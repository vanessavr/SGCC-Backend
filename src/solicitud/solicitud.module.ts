import { Module } from '@nestjs/common'
import { SolicitudService } from './solicitud.service'
import { SolicitudController } from './solicitud.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthService } from 'src/auth/auth.service'
import { UsuarioService } from 'src/usuario/usuario.service'
import { EmpresaService } from 'src/empresa/empresa.service'

@Module({
    controllers: [SolicitudController],
    providers: [SolicitudService, AuthService, UsuarioService, EmpresaService],
    imports: [PrismaModule],
})
export class SolicitudModule {}
