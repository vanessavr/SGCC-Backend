import { Injectable } from '@nestjs/common'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { UpdateUsuarioDto } from './dto/update-usuario.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UsuarioService {
    constructor(private prisma: PrismaService) {}

    //Crear usuario POST
    create(createUsuarioDto: CreateUsuarioDto) {
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
