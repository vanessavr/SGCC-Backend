import { Module } from '@nestjs/common'
import { SolicitudService } from './solicitud.service'
import { SolicitudController } from './solicitud.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthService } from 'src/auth/auth.service'

@Module({
    controllers: [SolicitudController],
    providers: [SolicitudService, AuthService],
    imports: [PrismaModule],
})
export class SolicitudModule {}
