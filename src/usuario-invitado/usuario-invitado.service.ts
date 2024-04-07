import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUsuarioInvitadoDto } from './dto/create-usuario-invitado.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UsuarioInvitadoService {
    constructor(private prisma: PrismaService) {}

    async create(createUsuarioInvitadoDto: CreateUsuarioInvitadoDto) {
        const { cursoComplementarioId, ...restoDatos } = createUsuarioInvitadoDto

        const usuarioExisting = await this.prisma.usuarioInvitado.findUnique({
            where: {
                correoElectronico: createUsuarioInvitadoDto.correoElectronico,
            },
        })

        let usuarioSolicitud = usuarioExisting

        if (!usuarioExisting) {
            usuarioSolicitud = await this.prisma.usuarioInvitado.create({
                data: {
                    ...restoDatos,
                },
            })
        }

        const existingSolicitud = await this.prisma.solicitud.findFirst({
            where: {
                usuarioInvitadoId: usuarioSolicitud.id,
                estadoSolicitud: '1',
            },
        })

        if (existingSolicitud) {
            throw new HttpException('No puede aplicar a más de una solicitud', HttpStatus.BAD_REQUEST)
        }

        return this.prisma.solicitud.create({
            data: {
                fechaSolicitud: new Date(),
                cuposSolicitados: 0,
                estadoSolicitud: '1',
                motivoSolicitud: '3',
                origenSolicitud: '4',
                radicadoSolicitud: null,
                segmento: '1',
                tipoSolicitud: '1',
                cursoComplementarioId: cursoComplementarioId,
                usuarioInvitadoId: usuarioSolicitud?.id,
            },
        })
    }

    findAll() {
        return this.prisma.usuarioInvitado.findMany()
    }

    findOne(id: number) {
        return `This action returns a #${id} usuarioInvitado`
    }

    remove(id: number) {
        return `This action removes a #${id} usuarioInvitado`
    }
}
