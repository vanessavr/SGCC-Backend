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
        const newFechaNacimiento = new Date(fechaNacimiento)
        createUsuarioDto = { ...createUsuarioDto, password: plainToHash, fechaNacimiento: newFechaNacimiento }

        return this.prisma.usuario.create({
            data: createUsuarioDto,
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
    remove(id: string) {
        return this.prisma.usuario.delete({
            where: {
                id,
            },
        })
    }
}
