import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, HttpStatus, HttpException, Req } from '@nestjs/common'
import { EmpresaService } from './empresa.service'
import { CreateEmpresaDto } from './dto/create-empresa.dto'
import { UpdateEmpresaDto } from './dto/update-empresa.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/jwt-auth.guard'
import { FileInterceptor } from '@nestjs/platform-express'
import { multerConfig } from 'src/config/multer.config'
import { AuthService } from 'src/auth/auth.service'
import { CambiarPasswordEmpresaDto } from './dto/cambiar-password-empresa.dto'

@ApiTags('Empresa')
@Controller('empresa')
export class EmpresaController {
    constructor(
        private readonly empresaService: EmpresaService,
        private readonly authService: AuthService,
    ) {}

    @Post()
    create(@Body() createEmpresaDto: CreateEmpresaDto) {
        return this.empresaService.create(createEmpresaDto)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get()
    findAll() {
        return this.empresaService.findAll()
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.empresaService.findOne(id)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
        return this.empresaService.update(id, updateEmpresaDto)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.empresaService.remove(id)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('/cambiar-password-empresa')
    cambiarPassword(@Body() cambiarPasswordEmpresaDto: CambiarPasswordEmpresaDto) {
        return this.empresaService.cambiarPassword(cambiarPasswordEmpresaDto.empresaId, cambiarPasswordEmpresaDto)
    }

    @Post('upload-foto')
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async uploadFotoPerfil(@Req() req: Request, @UploadedFile() file) {
        const profileData = await this.authService.getProfileData(req)

        if (!file) {
            throw new HttpException('Archivo no proporcionado', HttpStatus.BAD_REQUEST)
        }

        const resultado = await this.empresaService.savePathFotoPerfil(profileData.id, file.filename)

        return resultado
    }
}
