import { Module } from '@nestjs/common'
import { EmpresaService } from './empresa.service'
import { EmpresaController } from './empresa.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthService } from 'src/auth/auth.service'
import { UsuarioService } from 'src/usuario/usuario.service'

@Module({
    controllers: [EmpresaController],
    providers: [EmpresaService, AuthService, UsuarioService],
    imports: [PrismaModule],
})
export class EmpresaModule {}
