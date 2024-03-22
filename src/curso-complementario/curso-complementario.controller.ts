import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CursoComplementarioService } from './curso-complementario.service'
import { CreateCursoComplementarioDto } from './dto/create-curso-complementario.dto'
import { UpdateCursoComplementarioDto } from './dto/update-curso-complementario.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Curso Complementario')
@Controller('curso-complementario')
export class CursoComplementarioController {
    constructor(private readonly cursoComplementarioService: CursoComplementarioService) {}

    @Post()
    create(@Body() createCursoComplementarioDto: CreateCursoComplementarioDto) {
        createCursoComplementarioDto.duracion = +createCursoComplementarioDto.duracion
        createCursoComplementarioDto.cuposDisponibles = +createCursoComplementarioDto.cuposDisponibles

        return this.cursoComplementarioService.create(createCursoComplementarioDto)
    }

    @Get()
    findAll() {
        return this.cursoComplementarioService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.cursoComplementarioService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCursoComplementarioDto: UpdateCursoComplementarioDto) {
        updateCursoComplementarioDto.duracion = +updateCursoComplementarioDto.duracion
        updateCursoComplementarioDto.cuposDisponibles = +updateCursoComplementarioDto.cuposDisponibles

        return this.cursoComplementarioService.update(id, updateCursoComplementarioDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.cursoComplementarioService.remove(id)
    }
}
