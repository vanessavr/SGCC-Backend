import { Module } from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { SolicitudController } from './solicitud.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SolicitudController],
  providers: [SolicitudService],
  imports: [PrismaModule],
})
export class SolicitudModule {}
