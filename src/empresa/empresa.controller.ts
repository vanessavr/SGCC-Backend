import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { EmpresaService } from './empresa.service'
import { CreateEmpresaDto } from './dto/create-empresa.dto'
import { UpdateEmpresaDto } from './dto/update-empresa.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/jwt-auth.guard'

@ApiTags('Empresa')
@Controller('empresa')
export class EmpresaController {
    constructor(private readonly empresaService: EmpresaService) {}

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
}
