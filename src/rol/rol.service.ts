import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class RolService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        const roles = await this.prisma.rol.findMany()

        // Filtrar los roles para excluir el rol con el ID específico
        const rolesFiltrados = roles.filter((rol) => rol.id !== 'd7f72697-7937-490a-953d-26bd122d6c3e')

        return rolesFiltrados
    }

    findOne(id: number) {
        return `This action returns a #${id} rol`
    }

    remove(id: number) {
        return `This action removes a #${id} rol`
    }
}
