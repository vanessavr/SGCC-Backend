import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { HorarioService } from './horario.service'
import { CreateHorarioDto } from './dto/create-horario.dto'
import { UpdateHorarioDto } from './dto/update-horario.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/jwt-auth.guard'

@ApiTags('Horario')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('horario')
export class HorarioController {
    constructor(private readonly horarioService: HorarioService) {}

    @Post()
    create(@Body() createHorarioDto: CreateHorarioDto) {
        return this.horarioService.create(createHorarioDto)
    }

    @Get()
    findAll() {
        return this.horarioService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.horarioService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateHorarioDto: UpdateHorarioDto) {
        return this.horarioService.update(id, updateHorarioDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.horarioService.remove(id)
    }
}
