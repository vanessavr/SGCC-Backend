import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ListasService } from './listas.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Listas')
@Controller('listas')
export class ListasController {
    constructor(private readonly listasService: ListasService) {}

    @Get('/actividades-economicas')
    findAllActividadesEconomicas() {
        return this.listasService.getActividadesEconomicas()
    }

    @Get('/departamento')
    findAllDepartamentos() {
        return this.listasService.getDepartamentos()
    }

    @Get('/departamento/:id')
    findAllCiudades(@Param('id') id: number) {
        return this.listasService.getCiudades(id)
    }
}
