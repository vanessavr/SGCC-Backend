import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UpdatePerfilDto } from './dto/update-perfil.dto'
import { UsuarioService } from 'src/usuario/usuario.service'

@ApiTags('Perfil')
@Controller('perfil')
export class PerfilController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Get(':id')
    findMyProfile(@Param('id') id: string) {
        return this.usuarioService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePerfilDto: UpdatePerfilDto) {
        return this.usuarioService.update(id, updatePerfilDto)
    }

    @Patch(':id/cambiar-password')
    updatePassword(@Param('id') id: string, @Body() updatePerfilDto: UpdatePerfilDto) {
        return this.usuarioService.update(id, updatePerfilDto)
    }
}
