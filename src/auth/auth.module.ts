import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { UsuarioService } from 'src/usuario/usuario.service'
import { EmpresaService } from 'src/empresa/empresa.service'

@Module({
    controllers: [AuthController],
    providers: [AuthService, UsuarioService, EmpresaService, JwtStrategy],
    imports: [
        PrismaModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
})
export class AuthModule {}
