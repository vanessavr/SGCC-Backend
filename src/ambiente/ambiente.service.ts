import { Injectable } from '@nestjs/common'
import { CreateAmbienteDto } from './dto/create-ambiente.dto'
import { UpdateAmbienteDto } from './dto/update-ambiente.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AmbienteService {
    constructor(private prisma: PrismaService) {}

    //Crear ambiente POST
    create(createAmbienteDto: CreateAmbienteDto) {
        return this.prisma.ambiente.create({
            data: createAmbienteDto,
        })
    }

    // es para traer rodo de la base de datos de la tabla ambiente  Get /ambiente
    findAll() {
        return this.prisma.ambiente.findMany()
    }

    // trae un registro por el campo id de la tabla ambiente Get /ambiente/{id}
    findOne(id: string) {
        return this.prisma.ambiente.findUnique({
            where: {
                id,
            },
        })
    }

    //actualizar PATCH
    update(id: string, updateAmbienteDto: UpdateAmbienteDto) {
        return this.prisma.ambiente.update({
            where: {
                id,
            },
            data: updateAmbienteDto,
        })
    }

    //Eliminar DELETE
    remove(id: string) {
        return this.prisma.ambiente.delete({
            where: {
                id,
            },
        })
    }
}
