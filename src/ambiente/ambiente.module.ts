import { Module } from '@nestjs/common';
import { AmbienteService } from './ambiente.service';
import { AmbienteController } from './ambiente.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AmbienteController],
  providers: [AmbienteService],
  imports: [PrismaModule],
})
export class AmbienteModule {}
