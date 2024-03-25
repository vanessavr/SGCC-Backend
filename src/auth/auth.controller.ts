import { Controller, Post, Res, HttpException, Body, UnauthorizedException, Get, Req, UseGuards, Patch } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginAuthDto } from './dto/login-auth.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { compare } from 'bcrypt'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from './jwt-auth.guard'
import { UpdatePerfilDto } from './dto/update-perfil.dto'
import { UsuarioService } from 'src/usuario/usuario.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly authService: AuthService,
        private readonly usuarioService: UsuarioService,
    ) {}

    @Post('login')
    async login(@Res({ passthrough: true }) res: Response, @Body() loginAuthDto: LoginAuthDto) {
        const { numeroIdentificacion, password } = await loginAuthDto

        const findUser = await this.prisma.usuario.findUnique({ where: { numeroIdentificacion: numeroIdentificacion.toString() } })
        if (!findUser) throw new HttpException('USER_NOT_FOUND', 404)

        const checkPassword = await compare(password, findUser.password)
        if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403)

        const payload = {
            id: findUser.id,
            nombres: findUser.nombres,
            apellidos: findUser.apellidos,
            tipoDocumento: findUser.tipoDocumento,
            numeroIdentificacion: findUser.numeroIdentificacion,
            correoElectronico: findUser.correoElectronico,
            departamento: findUser.departamento,
            ciudad: findUser.ciudad,
            fechaNacimiento: findUser.fechaNacimiento.toISOString().slice(0, 10),
            celular: findUser.celular,
        }
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

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('profile')
    async getUserProfile(@Req() req: Request) {
        const accessToken = req.headers['authorization'].split(' ')[1]
        if (!accessToken) {
            throw new UnauthorizedException('Token de acceso no proporcionado')
        }

        const tokenData = await this.authService.getUserFromToken(accessToken)

        const user = await this.usuarioService.findOne(tokenData.id)

        const userTransformedData = { ...user, fechaNacimiento: user.fechaNacimiento.toISOString().slice(0, 10) }

        return userTransformedData
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Patch('profile/update')
    async update(@Req() req: Request, @Body() updatePerfilDto: UpdatePerfilDto) {
        const accessToken = req.headers['authorization'].split(' ')[1]

        if (!accessToken) {
            throw new UnauthorizedException('Token de acceso no proporcionado')
        }

        const user = await this.authService.getUserFromToken(accessToken)

        return this.usuarioService.update(user.id, updatePerfilDto)
    }
}
