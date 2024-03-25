import { Injectable } from '@nestjs/common'
import { CreateCursoComplementarioDto } from './dto/create-curso-complementario.dto'
import { UpdateCursoComplementarioDto } from './dto/update-curso-complementario.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CursoComplementarioService {
    constructor(private prisma: PrismaService) {}

    //Crear curso complementario POST
    create(createCursoComplementarioDto: CreateCursoComplementarioDto) {
        const { duracion, cuposDisponibles, fechaInicio, fechaFin } = createCursoComplementarioDto

        createCursoComplementarioDto = {
            ...createCursoComplementarioDto,
            duracion: +duracion,
            cuposDisponibles: +cuposDisponibles,
            fechaInicio: fechaInicio ? new Date(fechaInicio) : null,
            fechaFin: fechaFin ? new Date(fechaFin) : null,
        }

        return this.prisma.cursoComplementario.create({
            data: createCursoComplementarioDto,
        })
    }

    // es para traer rodo de la base de datos de la tabla cursos complementarios
    //  Get /curso-complementario
    findAll() {
        return this.prisma.cursoComplementario.findMany({
            include: {
                instructor: {
                    select: {
                        nombres: true, // Selecciona solo el nombre del instructor
                    },
                },
                ambiente: {
                    select: {
                        nombre: true, // Selecciona solo el nombre del ambiente
                    },
                },
            },
        })
    }

    // trae un registro por el campo id de la tabla cursos complementarios Get /cursos-complementarios/{id}
    findOne(id: string) {
        return this.prisma.cursoComplementario.findUnique({
            where: {
                id,
            },
            include: { ambiente: true },
        })
    }

    //actualizar PATCH
    update(id: string, updateCursoComplementarioDto: UpdateCursoComplementarioDto) {
        const { duracion, cuposDisponibles, fechaInicio, fechaFin } = updateCursoComplementarioDto

        updateCursoComplementarioDto = {
            ...updateCursoComplementarioDto,
            duracion: +duracion,
            cuposDisponibles: +cuposDisponibles,
            fechaInicio: fechaInicio ? new Date(fechaInicio) : null,
            fechaFin: fechaFin ? new Date(fechaFin) : null,
        }

        return this.prisma.cursoComplementario.update({
            where: {
                id,
            },
            data: updateCursoComplementarioDto,
        })
    }

    //eliminar
    remove(id: string) {
        return this.prisma.cursoComplementario.delete({
            where: {
                id,
            },
        })
    }

    findByCursoComplementario(id: string, idCursoComplementario: string) {
        return this.prisma.cursoComplementario.findUnique({
            where: {
                id,
                // id: idCursoComplementario,
            },
        })
    }

    findCursosComplementariosByInstructor(id: string) {
        return this.prisma.cursoComplementario.findMany({
            where: {
                instructorId: id,
            },
            include: {
                instructor: {
                    select: {
                        nombres: true,
                        apellidos: true,
                    },
                },
                ambiente: {
                    select: {
                        nombre: true,
                    },
                },
            },
        })
    }
}
