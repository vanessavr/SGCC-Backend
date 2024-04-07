import { Injectable } from '@nestjs/common'
import { CreateEmpresaDto } from './dto/create-empresa.dto'
import { UpdateEmpresaDto } from './dto/update-empresa.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { hash, compare } from 'bcrypt'
import { CambiarPasswordEmpresaDto } from './dto/cambiar-password-empresa.dto'

@Injectable()
export class EmpresaService {
    constructor(private prisma: PrismaService) {}

    //Crear empresa POST
    async create(createEmpresaDto: CreateEmpresaDto) {
        const { password } = createEmpresaDto
        const plainToHash = await hash(password, 10)
        createEmpresaDto = { ...createEmpresaDto, password: plainToHash }

        const createdEmpresa = await this.prisma.empresa.create({
            data: createEmpresaDto,
        })

        return this.prisma.modeloRol.create({
            data: {
                rolId: process.env.ROL_EMPRESA_ID,
                empresaId: createdEmpresa.id,
            },
        })
    }

    // es para traer todo de la base de datos de la tabla empresas  Get /empresa
    findAll() {
        return this.prisma.empresa.findMany()
    }

    // trae un registro por el campo id de la tabla empresa Get /empresa/{id}
    async findOne(id: string) {
        const empresa = await this.prisma.empresa.findUnique({
            where: {
                id,
            },
        })

        // Crear un nuevo objeto con los datos de la empresa y el rolId
        const empresaConRolId = {
            ...empresa,
            rolId: process.env.ROL_EMPRESA_ID,
        }

        return empresaConRolId
    }

    //actualizar PATCH
    update(id: string, updateEmpresaDto: UpdateEmpresaDto) {
        return this.prisma.empresa.update({
            where: {
                id,
            },
            data: updateEmpresaDto,
        })
    }

    //eliminar
    async remove(id: string) {
        return await this.prisma.$transaction([
            // Eliminar el responsable de la solicitud
            this.prisma.modeloRol.deleteMany({
                where: {
                    empresaId: id,
                },
            }),
            // Eliminar la solicitud
            this.prisma.empresa.delete({
                where: {
                    id,
                },
            }),
        ])
    }

    async cambiarPassword(id: string, cambiarPasswordEmpresaDto: CambiarPasswordEmpresaDto) {
        const findEmpresa = await this.prisma.empresa.findUnique({
            where: {
                id,
            },
            select: {
                password: true,
            },
        })

        const checkPassword = await compare(cambiarPasswordEmpresaDto.oldPassword, findEmpresa.password)
        const plainToHash = await hash(cambiarPasswordEmpresaDto.newPassword, 10)

        if (checkPassword) {
            return this.prisma.empresa.update({
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
        return this.prisma.empresa.update({
            where: {
                id: id,
            },
            data: {
                foto: rutaFoto,
            },
        })
    }
}
