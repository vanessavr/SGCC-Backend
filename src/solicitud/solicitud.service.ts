import { Injectable } from '@nestjs/common'
import { CreateSolicitudDto } from './dto/create-solicitud.dto'
import { UpdateSolicitudDto } from './dto/update-solicitud.dto'
import { PrismaService } from 'src/prisma/prisma.service'

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

    // es para traer rodo de la base de datos de la tabla solicitud  Get /solicitud
    findAll() {
        return this.prisma.solicitud.findMany({
            include: {
                usuario: {
                    select: {
                        nombres: true,
                    },
                },
            },
        })
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
}
