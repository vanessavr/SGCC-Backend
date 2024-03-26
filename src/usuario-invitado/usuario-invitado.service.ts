import { Injectable } from '@nestjs/common'
import { CreateUsuarioInvitadoDto } from './dto/create-usuario-invitado.dto'
import { UpdateUsuarioInvitadoDto } from './dto/update-usuario-invitado.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UsuarioInvitadoService {
    constructor(private prisma: PrismaService) {}

    async create(createUsuarioInvitadoDto: CreateUsuarioInvitadoDto) {
        const { cursoComplementarioId, ...restoDatos } = createUsuarioInvitadoDto

        const usuarioInvitadoCreated = await this.prisma.usuarioInvitado.create({
            data: {
                ...restoDatos,
            },
        })

        return this.prisma.solicitud.create({
            data: {
                fechaSolicitud: new Date(),
                cuposSolicitados: 0,
                estadoSolicitud: '1',
                motivoSolicitud: '3',
                origenSolicitud: '4',
                radicadoSolicitud: 'Sin radicar',
                segmento: '1',
                tipoSolicitud: '1',
                cursoComplementarioId: cursoComplementarioId,
                usuarioInvitadoId: usuarioInvitadoCreated.id,
            },
        })
    }

    findAll() {
        return this.prisma.usuarioInvitado.findMany()
    }

    findOne(id: number) {
        return `This action returns a #${id} usuarioInvitado`
    }

    update(id: number, updateUsuarioInvitadoDto: UpdateUsuarioInvitadoDto) {
        return `This action updates a #${id} usuarioInvitado`
    }

    remove(id: number) {
        return `This action removes a #${id} usuarioInvitado`
    }
}
