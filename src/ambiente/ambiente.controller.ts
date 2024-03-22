import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { AmbienteService } from './ambiente.service'
import { CreateAmbienteDto } from './dto/create-ambiente.dto'
import { UpdateAmbienteDto } from './dto/update-ambiente.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Ambiente')
@Controller('ambiente')
export class AmbienteController {
    constructor(private readonly ambienteService: AmbienteService) {}

    @Post()
    create(@Body() createAmbienteDto: CreateAmbienteDto) {
        createAmbienteDto.capacidad = +createAmbienteDto.capacidad

        return this.ambienteService.create(createAmbienteDto)
    }

    @Get()
    findAll() {
        return this.ambienteService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ambienteService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAmbienteDto: UpdateAmbienteDto) {
        updateAmbienteDto.capacidad = +updateAmbienteDto.capacidad

        return this.ambienteService.update(id, updateAmbienteDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ambienteService.remove(id)
    }
}
