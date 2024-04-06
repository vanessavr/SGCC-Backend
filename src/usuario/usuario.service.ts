import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { UpdateUsuarioDto } from './dto/update-usuario.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { hash, compare } from 'bcrypt'
import { CambiarPasswordDto } from './dto/cambiar-password.dto'

@Injectable()
export class UsuarioService {
    constructor(private prisma: PrismaService) {}

    //Crear usuario POST
    async create(createUsuarioDto: CreateUsuarioDto) {
        const { password, fechaNacimiento, rolId, ...restoDatos } = createUsuarioDto
        const plainToHash = await hash(password, 10)

        const createdUser = await this.prisma.usuario.create({
            data: {
                ...restoDatos,
                password: plainToHash,
                fechaNacimiento: new Date(fechaNacimiento),
            },
        })

        return this.prisma.modeloRol.create({
            data: {
                rolId: rolId || 'b202d04e-eb12-4cf5-9c2d-d382536e7ff4',
                usuarioId: createdUser.id,
            },
        })
    }

    // es para traer todo de la base de datos de la tabla usuarios  Get /usuario
    findAll(rolId: string) {
        return this.prisma.usuario.findMany({
            where: {
                modeloRoles: {
                    some: {
                        rolId: {
                            equals: rolId,
                        },
                    },
                },
            },
        })
    }

    // trae un registro por el campo id de la tabla usuario Get /usuario/{id}
    async findOne(id: string) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { id },
        })

        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado')
        }

        const modeloRoles = await this.prisma.modeloRol.findMany({
            where: { usuarioId: usuario.id },
        })

        const rolId = modeloRoles.map((modeloRol) => modeloRol.rolId)[0]

        // Crear un nuevo objeto con los datos del usuario y el rolId
        const usuarioConRolId = {
            ...usuario,
            rolId: rolId,
        }

        return usuarioConRolId
    }

    // actualizar PATCH
    async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
        // Extraer el rolId y eliminarlo de updateUsuarioDto
        const { fechaNacimiento, rolId, ...restoDatos } = updateUsuarioDto

        // Convertir la fecha de nacimiento a un objeto Date
        const newFechaNacimiento = new Date(fechaNacimiento)

        // Actualizar el modeloRol con el nuevo rolId
        await this.prisma.modeloRol.updateMany({
            where: {
                usuarioId: id,
            },
            data: {
                rolId: rolId,
            },
        })

        // Actualizar el usuario con los datos restantes y la nueva fecha de nacimiento
        return this.prisma.usuario.update({
            where: {
                id,
            },
            data: {
                ...restoDatos,
                fechaNacimiento: newFechaNacimiento,
            },
        })
    }

    //Eliminar DELETE
    async remove(id: string) {
        return await this.prisma.$transaction([
            // Eliminar el responsable de la solicitud
            this.prisma.modeloRol.deleteMany({
                where: {
                    usuarioId: id,
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

    async cambiarPassword(id: string, cambiarPasswordDto: CambiarPasswordDto) {
        const findUser = await this.prisma.usuario.findUnique({
            where: {
                id,
            },
            select: {
                password: true,
            },
        })

        const checkPassword = await compare(cambiarPasswordDto.oldPassword, findUser.password)
        const plainToHash = await hash(cambiarPasswordDto.newPassword, 10)

        if (checkPassword) {
            return this.prisma.usuario.update({
                where: {
                    id,
                },
                data: {
                    password: plainToHash,
                },
            })
        }

        return
    }

    savePathFotoPerfil(id: string, rutaFoto: string) {
        return this.prisma.usuario.update({
            where: {
                id: id,
            },
            data: {
                foto: rutaFoto,
            },
        })
    }
}
