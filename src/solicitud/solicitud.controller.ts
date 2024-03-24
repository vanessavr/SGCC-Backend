import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { SolicitudService } from './solicitud.service'
import { CreateSolicitudDto } from './dto/create-solicitud.dto'
import { UpdateSolicitudDto } from './dto/update-solicitud.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/jwt-auth.guard'

@ApiTags('Solicitud')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('solicitud')
export class SolicitudController {
    constructor(private readonly solicitudService: SolicitudService) {}

    @Post()
    create(@Body() createSolicitudDto: CreateSolicitudDto) {
        const currentDate = new Date()
        createSolicitudDto.fechaSolicitud = currentDate
        createSolicitudDto.cuposSolicitados = +createSolicitudDto.cuposSolicitados

        return this.solicitudService.create(createSolicitudDto)
    }

    @Get()
    findAll() {
        return this.solicitudService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.solicitudService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSolicitudDto: UpdateSolicitudDto) {
        updateSolicitudDto.cuposSolicitados = +updateSolicitudDto.cuposSolicitados

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
}
