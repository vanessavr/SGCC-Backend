import { Module } from '@nestjs/common'
import { HorarioService } from './horario.service'
import { HorarioController } from './horario.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
    controllers: [HorarioController],
    providers: [HorarioService],
    imports: [PrismaModule],
})
export class HorarioModule {}
