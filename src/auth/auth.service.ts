import { HttpException, Injectable } from '@nestjs/common'
import { LoginAuthDto } from './dto/login-auth.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async login(loginAuthDto: LoginAuthDto) {
        const { numeroIdentificacion, password } = loginAuthDto
        const findUser = await this.prisma.usuario.findUnique({ where: { numeroIdentificacion: numeroIdentificacion.toString() } })
        if (!findUser) new HttpException('USER_NOT_FOUND', 404)

        const checkPassword = await compare(password, findUser.password)

        if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403)

        const payload = { id: findUser.id, nombres: findUser.nombres }
        const token = this.jwtService.sign(payload)

        const data = {
            user: findUser,
            token,
        }

        return data
    }
}
