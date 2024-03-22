import { Injectable } from '@nestjs/common'
import { CreateHorarioDto } from './dto/create-horario.dto'
import { UpdateHorarioDto } from './dto/update-horario.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class HorarioService {
    constructor(private prisma: PrismaService) {}
    //Crear horario POST
    create(createHorarioDto: CreateHorarioDto) {
        return this.prisma.horario.create({
            data: createHorarioDto,
        })
    }

    // es para traer rodo de la base de datos de la tabla horarios  Get /horario
    findAll() {
        return this.prisma.horario.findMany()
    }

    // trae un registro por el campo id de la tabla horario Get /horario/{id}
    findOne(id: string) {
        return this.prisma.horario.findUnique({
            where: {
                id,
            },
        })
    }

    update(id: string, updateHorarioDto: UpdateHorarioDto) {
        return this.prisma.horario.update({
            where: {
                id,
            },
            data: updateHorarioDto,
        })
    }

    remove(id: string) {
        return this.prisma.horario.delete({
            where: {
                id,
            },
        })
    }
}
