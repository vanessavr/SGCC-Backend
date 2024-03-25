import { Injectable } from '@nestjs/common'
import { CreateEmpresaDto } from './dto/create-empresa.dto'
import { UpdateEmpresaDto } from './dto/update-empresa.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { hash } from 'bcrypt'

@Injectable()
export class EmpresaService {
    constructor(private prisma: PrismaService) {}

    //Crear empresa POST
    async create(createEmpresaDto: CreateEmpresaDto) {
        const { password } = createEmpresaDto
        const plainToHash = await hash(password, 10)
        createEmpresaDto = { ...createEmpresaDto, password: plainToHash }

        const createdEmpresa = await this.prisma.empresa.create({
            data: createEmpresaDto,
        })

        return this.prisma.modeloRol.create({
            data: {
                rolId: 'd7f72697-7937-490a-953d-26bd122d6c3e',
                modeloId: createdEmpresa.id,
            },
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
    async remove(id: string) {
        const transaction = await this.prisma.$transaction([
            // Eliminar el responsable de la solicitud
            this.prisma.modeloRol.deleteMany({
                where: {
                    modeloId: id,
                },
            }),
            // Eliminar la solicitud
            this.prisma.empresa.delete({
                where: {
                    id,
                },
            }),
        ])
    }
}
