import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { UsuarioService } from './usuario.service'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { UpdateUsuarioDto } from './dto/update-usuario.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CursoComplementarioService } from 'src/curso-complementario/curso-complementario.service'
import { AuthGuard } from 'src/auth/jwt-auth.guard'

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

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('/rol/:rolId')
    findAll(@Param('rolId') rolId: string) {
        return this.usuarioService.findAll(rolId)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usuarioService.findOne(id)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
        return this.usuarioService.update(id, updateUsuarioDto)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usuarioService.remove(id)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get(':id/curso-complementario')
    findCursosComplementariosByInstructor(@Param('id') id: string) {
        return this.cursoComplementarioService.findCursosComplementariosByInstructor(id)
    }
}
