import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AreaFormacionService {
    constructor(private prisma: PrismaService) {}

    // es para traer todo de la base de datos de la tabla
    async findAll(): Promise<string[]> {
        const cursos = await this.prisma.cursoComplementario.findMany({
            select: {
                areaFormacion: true,
            },
        })

        // Extraer todas las áreas de formación
        const allAreas = cursos.map((curso) => curso.areaFormacion)

        // Eliminar duplicados
        const uniqueAreas = Array.from(new Set(allAreas))

        return uniqueAreas
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
