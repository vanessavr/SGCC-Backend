import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UsuarioService } from './usuario.service'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { UpdateUsuarioDto } from './dto/update-usuario.dto'
import { ApiTags } from '@nestjs/swagger'
import { CursoComplementarioService } from 'src/curso-complementario/curso-complementario.service'

@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly cursoComplementarioService: CursoComplementarioService,
    ) {}

    @Post()
    create(@Body() createUsuarioDto: CreateUsuarioDto) {
        return this.usuarioService.create(createUsuarioDto)
    }

    @Get()
    findAll() {
        return this.usuarioService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usuarioService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
        return this.usuarioService.update(id, updateUsuarioDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usuarioService.remove(id)
    }

    @Get(':id/curso-complementario')
    findCursosComplementariosByInstructor(@Param('id') id: string) {
        return this.cursoComplementarioService.findCursosComplementariosByInstructor(id)
    }
}
