import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UpdatePerfilDto } from './dto/update-perfil.dto'
import { UsuarioService } from 'src/usuario/usuario.service'
import { AuthGuard } from 'src/auth/jwt-auth.guard'

@ApiTags('Perfil')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('perfil')
export class PerfilController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Get(':id')
    findMyProfile(@Param('id') id: string) {
        return this.usuarioService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePerfilDto: UpdatePerfilDto) {
        updatePerfilDto.fechaNacimiento = new Date(updatePerfilDto.fechaNacimiento)
        return this.usuarioService.update(id, updatePerfilDto)
    }

    @Patch(':id/cambiar-password')
    updatePassword(@Param('id') id: string, @Body() updatePerfilDto: UpdatePerfilDto) {
        return this.usuarioService.update(id, updatePerfilDto)
    }
}
