import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
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
}
