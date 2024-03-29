import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common'
import { SolicitudService } from './solicitud.service'
import { CreateSolicitudDto } from './dto/create-solicitud.dto'
import { UpdateSolicitudDto } from './dto/update-solicitud.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/jwt-auth.guard'
import { ApplyCursoComplementarioDto } from './dto/apply-curso-complementario.dto'
import { AuthService } from 'src/auth/auth.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { multerConfig } from 'src/config/multer.config'

@ApiTags('Solicitud')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('solicitud')
export class SolicitudController {
    constructor(
        private readonly solicitudService: SolicitudService,
        private readonly authService: AuthService,
    ) {}

    @Post()
    create(@Body() createSolicitudDto: CreateSolicitudDto) {
        return this.solicitudService.create(createSolicitudDto)
    }

    @Get()
    async findAll(@Req() req: Request) {
        const accessToken = req.headers['authorization']?.split(' ')[1] // Use optional chaining to avoid errors if 'authorization' header is missing

        if (!accessToken) {
            throw new UnauthorizedException('Token de acceso no proporcionado')
        }

        const tokenData = await this.authService.getUserFromToken(accessToken)

        if (tokenData) {
            return this.solicitudService.findAll(tokenData.id, tokenData.rolId)
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.solicitudService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSolicitudDto: UpdateSolicitudDto) {
        return this.solicitudService.update(id, updateSolicitudDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.solicitudService.remove(id)
    }

    @Patch(':id/cambiar-estado')
    updateEstado(@Param('id') id: string, @Body() updateSolicitudDto: UpdateSolicitudDto) {
        return this.solicitudService.update(id, updateSolicitudDto)
    }

    @Post('/aplicar-curso-complementario/:id')
    personaAplicarSolicitud(@Param('id') id: string, @Body() applyCursoComplementarioDto: ApplyCursoComplementarioDto) {
        return this.solicitudService.personaAplicarSolicitud(id, applyCursoComplementarioDto)
    }

    @Post(':id/upload-archivo')
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async uploadFotoPerfil(@Req() req: Request, @Param('id') id: string, @UploadedFile() file) {
        if (!file) {
            throw new HttpException('Archivo no proporcionado', HttpStatus.BAD_REQUEST)
        }

        const resultado = await this.solicitudService.savePathArchivo(id, file.filename)

        return resultado
    }
}
