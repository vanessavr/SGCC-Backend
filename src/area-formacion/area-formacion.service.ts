import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AreaFormacionService {
    constructor(private prisma: PrismaService) {}

    // es para traer todo de la base de datos de la tabla
    findAll() {
        return this.prisma.cursoComplementario
            .findMany({
                select: {
                    areaFormacion: true,
                },
            })
            .then((cursos) => cursos.map((curso) => curso.areaFormacion))
            .then((flattened) => flattened.flat())
    }

    findCursoComplementarioByAreaFormacion(id: string) {
        return this.prisma.cursoComplementario.findMany({
            where: {
                areaFormacion: {
                    contains: id,
                },
            },
        })
    }
}
