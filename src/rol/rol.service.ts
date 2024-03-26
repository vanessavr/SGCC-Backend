import { Injectable } from '@nestjs/common'
import { CreateRolDto } from './dto/create-rol.dto'
import { UpdateRolDto } from './dto/update-rol.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class RolService {
    constructor(private prisma: PrismaService) {}

    create(createRolDto: CreateRolDto) {
        return 'This action adds a new rol'
    }

    async findAll() {
        const roles = await this.prisma.rol.findMany()

        // Filtrar los roles para excluir el rol con el ID específico
        const rolesFiltrados = roles.filter((rol) => rol.id !== 'd7f72697-7937-490a-953d-26bd122d6c3e')

        return rolesFiltrados
    }

    findOne(id: number) {
        return `This action returns a #${id} rol`
    }

    update(id: number, updateRolDto: UpdateRolDto) {
        return `This action updates a #${id} rol`
    }

    remove(id: number) {
        return `This action removes a #${id} rol`
    }
}
