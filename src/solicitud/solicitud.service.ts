import { Injectable, Req } from '@nestjs/common'
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

        // Si el id NO es "1a364153-2864-461c-996a-d4382ac63aa2", agregar la condición where al objeto de opciones
        if (rolId !== '1a364153-2864-461c-996a-d4382ac63aa2') {
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

        updateSolicitudDto = { ...updateSolicitudDto, cuposSolicitados: +cuposSolicitados }

        return this.prisma.solicitud.update({
            where: {
                id,
            },
            data: updateSolicitudDto,
        })
    }

    //eliminar
    async remove(id: string) {
        const transaction = await this.prisma.$transaction([
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

    personaAplicarSolicitud(id, applyCursoComplementarioDto: ApplyCursoComplementarioDto) {
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
                usuarioId: applyCursoComplementarioDto.usuarioId,
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
