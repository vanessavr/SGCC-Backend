import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UsuarioInvitadoService } from './usuario-invitado.service'
import { CreateUsuarioInvitadoDto } from './dto/create-usuario-invitado.dto'
import { UpdateUsuarioInvitadoDto } from './dto/update-usuario-invitado.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Usuario invitado')
@Controller('usuario-invitado')
export class UsuarioInvitadoController {
    constructor(private readonly usuarioInvitadoService: UsuarioInvitadoService) {}

    @Post()
    create(@Body() createUsuarioInvitadoDto: CreateUsuarioInvitadoDto) {
        return this.usuarioInvitadoService.create(createUsuarioInvitadoDto)
    }

    @Get()
    findAll() {
        return this.usuarioInvitadoService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usuarioInvitadoService.findOne(+id)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usuarioInvitadoService.remove(+id)
    }
}
