import { Injectable } from '@nestjs/common'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { UpdateUsuarioDto } from './dto/update-usuario.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { hash } from 'bcrypt'

@Injectable()
export class UsuarioService {
    constructor(private prisma: PrismaService) {}

    //Crear usuario POST
    async create(createUsuarioDto: CreateUsuarioDto) {
        const { password, fechaNacimiento } = createUsuarioDto
        const plainToHash = await hash(password, 10)

        createUsuarioDto = { ...createUsuarioDto, password: plainToHash, fechaNacimiento: new Date(fechaNacimiento) }

        const createdUser = await this.prisma.usuario.create({
            data: createUsuarioDto,
        })

        return this.prisma.modeloRol.create({
            data: {
                rolId: 'b202d04e-eb12-4cf5-9c2d-d382536e7ff4',
                modeloId: createdUser.id,
            },
        })
    }

    // es para traer rodo de la base de datos de la tabla usuarios  Get /usuario
    findAll() {
        return this.prisma.usuario.findMany()
    }

    // trae un registro por el campo id de la tabla usuario Get /usuario/{id}
    findOne(id: string) {
        return this.prisma.usuario.findUnique({
            where: {
                id,
            },
        })
    }

    // actualizar PATCH
    update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
        const { fechaNacimiento } = updateUsuarioDto
        const newFechaNacimiento = new Date(fechaNacimiento)
        updateUsuarioDto = { ...updateUsuarioDto, fechaNacimiento: newFechaNacimiento }

        return this.prisma.usuario.update({
            where: {
                id,
            },
            data: updateUsuarioDto,
        })
    }

    //Eliminar DELETE
    async remove(id: string) {
        const transaction = await this.prisma.$transaction([
            // Eliminar el responsable de la solicitud
            this.prisma.modeloRol.deleteMany({
                where: {
                    modeloId: id,
                },
            }),
            // Eliminar la solicitud
            this.prisma.usuario.delete({
                where: {
                    id,
                },
            }),
        ])
    }
}
