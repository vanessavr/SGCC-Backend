import { Module } from '@nestjs/common'
import { AreaFormacionService } from './area-formacion.service'
import { AreaFormacionController } from './area-formacion.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { CursoComplementarioService } from 'src/curso-complementario/curso-complementario.service'

@Module({
    controllers: [AreaFormacionController],
    providers: [AreaFormacionService, CursoComplementarioService],
    imports: [PrismaModule],
})
export class AreaFormacionModule {}
