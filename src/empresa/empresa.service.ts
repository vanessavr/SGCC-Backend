import { Injectable } from '@nestjs/common'
import { CreateEmpresaDto } from './dto/create-empresa.dto'
import { UpdateEmpresaDto } from './dto/update-empresa.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class EmpresaService {
    constructor(private prisma: PrismaService) {}

    //Crear empresa POST
    create(createEmpresaDto: CreateEmpresaDto) {
        return this.prisma.empresa.create({
            data: createEmpresaDto,
        })
    }

    // es para traer rodo de la base de datos de la tabla empresas  Get /empresa
    findAll() {
        return this.prisma.empresa.findMany()
    }

    // trae un registro por el camppo id de la tabla empresa Get /empresa/{id}
    findOne(id: string) {
        return this.prisma.empresa.findUnique({
            where: {
                id,
            },
        })
    }

    //actualizar PATCH
    update(id: string, updateEmpresaDto: UpdateEmpresaDto) {
        return this.prisma.empresa.update({
            where: {
                id,
            },
            data: updateEmpresaDto,
        })
    }

    //eliminar
    remove(id: string) {
        return this.prisma.empresa.delete({
            where: {
                id,
            },
        })
    }
}
