import { Module } from '@nestjs/common'
import { CursoComplementarioService } from './curso-complementario.service'
import { CursoComplementarioController } from './curso-complementario.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
    controllers: [CursoComplementarioController],
    providers: [CursoComplementarioService],
    imports: [PrismaModule],
})
export class CursoComplementarioModule {}
