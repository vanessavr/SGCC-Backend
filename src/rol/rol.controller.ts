import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { RolService } from './rol.service'
import { CreateRolDto } from './dto/create-rol.dto'
import { UpdateRolDto } from './dto/update-rol.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/jwt-auth.guard'

@ApiTags('Rol')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('rol')
export class RolController {
    constructor(private readonly rolService: RolService) {}

    @Get()
    findAll() {
        return this.rolService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.rolService.findOne(+id)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.rolService.remove(+id)
    }
}
