import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common'
import { CreateSolicitudDto } from './dto/create-solicitud.dto'
import { UpdateSolicitudDto } from './dto/update-solicitud.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { ApplyCursoComplementarioDto } from './dto/apply-curso-complementario.dto'

@Injectable()
export class SolicitudService {
    constructor(private prisma: PrismaService) {}

    //Crear solicitud POST
    async create(createSolicitudDto: CreateSolicitudDto) {
        const { cuposSolicitados } = createSolicitudDto
        const currentDate = new Date()

        createSolicitudDto = { ...createSolicitudDto, fechaSolicitud: currentDate, cuposSolicitados: +cuposSolicitados }

        return await this.prisma.solicitud.create({
            data: createSolicitudDto,
            select: {
                id: true, // Ensure to select the id of the created Solicitud
            },
        })
    }

    // es para traer todo de la base de datos de la tabla solicitud  Get /solicitud
    findAll(id: string, rolId: string) {
        // Definir un objeto de opciones para findMany
        let queryOptions = {
            where: {},
            include: {
                usuario: {
                    select: {
                        nombres: true,
                    },
                },
            },
        }

        if (rolId === 'd7f72697-7937-490a-953d-26bd122d6c3e') {
            queryOptions.where = { empresaId: id }
        }

        // Si el id NO es "1a364153-2864-461c-996a-d4382ac63aa2", agregar la condición where al objeto de opciones
        if (rolId !== '1a364153-2864-461c-996a-d4382ac63aa2' && rolId !== '4a29d9e1-76aa-49ff-9ccc-e0a3d2ec90c9' && rolId !== 'd7f72697-7937-490a-953d-26bd122d6c3e') {
            queryOptions.where = { usuarioId: id }
        }

        // Llamar a findMany con las opciones definidas
        return this.prisma.solicitud.findMany(queryOptions)
    }

    // trae un registro por el campo id de la tabla solicitud Get /solicitud/{id}
    findOne(id: string) {
        return this.prisma.solicitud.findUnique({
            where: {
                id,
            },
            include: {
                usuario: {
                    select: {
                        nombres: true,
                        tipoDocumento: true,
                        numeroIdentificacion: true,
                    },
                },
            },
        })
    }

    //actualizar
    update(id: string, updateSolicitudDto: UpdateSolicitudDto) {
        const { cuposSolicitados } = updateSolicitudDto

        if (cuposSolicitados) {
            updateSolicitudDto = { ...updateSolicitudDto, cuposSolicitados: +cuposSolicitados }
        }

        return this.prisma.solicitud.update({
            where: {
                id,
            },
            data: updateSolicitudDto,
        })
    }

    //eliminar
    async remove(id: string) {
        return await this.prisma.$transaction([
            // Eliminar el responsable de la solicitud
            this.prisma.responsableSolicitud.deleteMany({
                where: {
                    solicitudId: id,
                },
            }),
            // Eliminar la solicitud
            this.prisma.solicitud.delete({
                where: {
                    id,
                },
            }),
        ])
    }

    async personaAplicarSolicitud(id, applyCursoComplementarioDto: ApplyCursoComplementarioDto) {
        const existingSolicitud = await this.prisma.solicitud.findFirst({
            where: {
                usuarioId: applyCursoComplementarioDto.usuarioId,
                estadoSolicitud: '1',
            },
        })

        if (existingSolicitud) {
            throw new HttpException(' No puede aplicar a más de una solicitud', HttpStatus.BAD_REQUEST)
        }

        return await this.prisma.solicitud.create({
            data: {
                fechaSolicitud: new Date(),
                cuposSolicitados: +applyCursoComplementarioDto.cuposSolicitados,
                estadoSolicitud: '1',
                motivoSolicitud: '3',
                origenSolicitud: '4',
                radicadoSolicitud: null,
                segmento: '1',
                tipoSolicitud: '1',
                cursoComplementarioId: id,
                usuarioId: applyCursoComplementarioDto.usuarioId,
            },
        })
    }

    empresaAplicarSolicitud(id, applyCursoComplementarioDto: ApplyCursoComplementarioDto) {
        return this.prisma.solicitud.create({
            data: {
                fechaSolicitud: new Date(),
                cuposSolicitados: +applyCursoComplementarioDto.cuposSolicitados,
                estadoSolicitud: '1',
                motivoSolicitud: '3',
                origenSolicitud: '4',
                radicadoSolicitud: null,
                segmento: '1',
                tipoSolicitud: '1',
                cursoComplementarioId: id,
                empresaId: applyCursoComplementarioDto.usuarioId,
            },
        })
    }

    savePathArchivo(id: string, rutaFoto: string) {
        return this.prisma.solicitud.update({
            where: {
                id: id,
            },
            data: {
                archivo: rutaFoto,
            },
        })
    }
}
