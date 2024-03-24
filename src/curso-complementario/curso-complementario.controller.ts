import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { CursoComplementarioService } from './curso-complementario.service'
import { CreateCursoComplementarioDto } from './dto/create-curso-complementario.dto'
import { UpdateCursoComplementarioDto } from './dto/update-curso-complementario.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/jwt-auth.guard'

@ApiTags('Curso Complementario')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('curso-complementario')
export class CursoComplementarioController {
    constructor(private readonly cursoComplementarioService: CursoComplementarioService) {}

    @Post()
    create(@Body() createCursoComplementarioDto: CreateCursoComplementarioDto) {
        createCursoComplementarioDto.duracion = +createCursoComplementarioDto.duracion
        createCursoComplementarioDto.cuposDisponibles = +createCursoComplementarioDto.cuposDisponibles
        createCursoComplementarioDto.fechaInicio = new Date(createCursoComplementarioDto.fechaInicio)
        createCursoComplementarioDto.fechaFin = new Date(createCursoComplementarioDto.fechaFin)

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
        updateCursoComplementarioDto.fechaInicio = new Date(updateCursoComplementarioDto.fechaInicio)
        updateCursoComplementarioDto.fechaFin = new Date(updateCursoComplementarioDto.fechaFin)

        return this.cursoComplementarioService.update(id, updateCursoComplementarioDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.cursoComplementarioService.remove(id)
    }
}
