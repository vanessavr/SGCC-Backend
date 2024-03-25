import { Controller, Post, Res, HttpException, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginAuthDto } from './dto/login-auth.dto'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { compare } from 'bcrypt'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly authService: AuthService,
    ) {}

    @Post('login')
    async login(@Res({ passthrough: true }) res: Response, @Body() loginAuthDto: LoginAuthDto) {
        const { numeroIdentificacion, password } = await loginAuthDto

        const findUser = await this.prisma.usuario.findUnique({ where: { numeroIdentificacion: numeroIdentificacion.toString() } })
        if (!findUser) throw new HttpException('USER_NOT_FOUND', 404)

        const checkPassword = await compare(password, findUser.password)
        if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403)

        const payload = { id: findUser.id, nombres: findUser.nombres }
        const token = this.jwtService.sign(payload)

        // Set the JWT token as a cookie in the response
        res.cookie('accessToken', token, { httpOnly: true })

        return { user: findUser, token }
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        // Eliminar la cookie que contiene el token de acceso
        res.clearCookie('accessToken')

        // Devolver una respuesta indicando que el logout fue exitoso
        return { message: 'Logout exitoso' }
    }
}
