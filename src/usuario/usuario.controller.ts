import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, HttpException, HttpStatus, Req } from '@nestjs/common'
import { UsuarioService } from './usuario.service'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { UpdateUsuarioDto } from './dto/update-usuario.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CursoComplementarioService } from 'src/curso-complementario/curso-complementario.service'
import { AuthGuard } from 'src/auth/jwt-auth.guard'
import { CambiarPasswordDto } from './dto/cambiar-password.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { multerConfig } from 'src/config/multer.config'
import { AuthService } from 'src/auth/auth.service'

@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly authService: AuthService,
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

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('/cambiar-password')
    cambiarPassword(@Body() cambiarPasswordDto: CambiarPasswordDto) {
        return this.usuarioService.cambiarPassword(cambiarPasswordDto.userId, cambiarPasswordDto)
    }

    @Post('upload-foto')
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async uploadFotoPerfil(@Req() req: Request, @UploadedFile() file) {
        const profileData = await this.authService.getProfileData(req)
        
        if (!file) {
            throw new HttpException('Archivo no proporcionado', HttpStatus.BAD_REQUEST);
        }

        const resultado = await this.usuarioService.savePathFotoPerfil(profileData.id, file.filename);

        return resultado
    }
}
