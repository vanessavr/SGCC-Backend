import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CursoComplementarioService } from 'src/curso-complementario/curso-complementario.service'
import { AreaFormacionService } from './area-formacion.service'

@ApiTags('Área de formación')
@Controller('area-formacion')
export class AreaFormacionController {
    constructor(private readonly areaFormacionService: AreaFormacionService) {}

    @Get()
    findAll() {
        return this.areaFormacionService.findAll()
    }

    @Get(':id/curso-complementario')
    findByAreaFormacion(@Param('id') id: string) {
        return this.areaFormacionService.findCursoComplementarioByAreaFormacion(id)
    }

    // @Get(':id/curso-complementario/:idCursoComplementario')
    // findByCursoComplementario(@Param('id') id: string, @Param('idCursoComplementario') idCursoComplementario: number) {
    //     return this.cursoComplementarioService.findByCursoComplementario(id, +idCursoComplementario)
    // }
}
