import { Controller, Post, Res, HttpException, Body, UnauthorizedException, Get, Req, UseGuards, Patch } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginAuthDto } from './dto/login-auth.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { compare } from 'bcrypt'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from './jwt-auth.guard'
import { UpdatePerfilPersonaDto } from './dto/update-perfil-persona.dto'
import { UpdatePerfilEmpresaDto } from './dto/update-perfil-empresa.dto'
import { UsuarioService } from 'src/usuario/usuario.service'
import { EmpresaService } from 'src/empresa/empresa.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly authService: AuthService,
        private readonly usuarioService: UsuarioService,
        private readonly empresaService: EmpresaService,
    ) {}

    @Post('login')
    async login(@Res({ passthrough: true }) res: Response, @Body() loginAuthDto: LoginAuthDto) {
        const { numeroIdentificacion, password } = await loginAuthDto

        const findUser = await this.prisma.usuario.findUnique({ where: { numeroIdentificacion: numeroIdentificacion.toString() } })
        const modeloRoles = await this.prisma.modeloRol.findMany({
            where: { usuarioId: findUser.id },
        })

        const rolId = modeloRoles.map((modeloRol) => modeloRol.rolId)[0]

        const findEmpresa = await this.prisma.empresa.findUnique({ where: { nit: numeroIdentificacion.toString() } })

        if (!findUser && !findEmpresa) throw new HttpException('USER_NOT_FOUND', 404)

        const modelPassword = findUser?.password || findEmpresa?.password

        const checkPassword = await compare(password, modelPassword)
        if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403)

        let payload = {}

        if (findUser) {
            payload = {
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
                rolId: rolId,
            }
        }

        if (findEmpresa) {
            payload = {
                id: findEmpresa.id,
                nombres: findEmpresa.razonSocial,
                apellidos: '',
                tipoDocumento: '',
                numeroIdentificacion: findEmpresa.nit,
                correoElectronico: findEmpresa.correoElectronico,
                departamento: findEmpresa.departamento,
                ciudad: findEmpresa.ciudad,
                fechaNacimiento: '',
                celular: findEmpresa.celular,
                rolId: 'd7f72697-7937-490a-953d-26bd122d6c3e',
            }
        }

        const token = this.jwtService.sign(payload)

        // Set the JWT token as a cookie in the response
        res.cookie('accessToken', token, { httpOnly: true })

        return { user: findUser || findEmpresa, token }
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
        const empresa = await this.empresaService.findOne(tokenData.id)

        return user || empresa
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Patch('profile/update-persona')
    async updateProfilePersona(@Req() req: Request, @Body() updatePerfilPersonaDto: UpdatePerfilPersonaDto) {
        const accessToken = req.headers['authorization'].split(' ')[1]

        if (!accessToken) {
            throw new UnauthorizedException('Token de acceso no proporcionado')
        }

        const userFromToken = await this.authService.getUserFromToken(accessToken)

        return this.usuarioService.update(userFromToken.id, updatePerfilPersonaDto)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Patch('profile/update-empresa')
    async updateProfileEmpresa(@Req() req: Request, @Body() updatePerfilEmpresaDto: UpdatePerfilEmpresaDto) {
        const accessToken = req.headers['authorization'].split(' ')[1]

        if (!accessToken) {
            throw new UnauthorizedException('Token de acceso no proporcionado')
        }

        const userFromToken = await this.authService.getUserFromToken(accessToken)

        return this.empresaService.update(userFromToken.id, updatePerfilEmpresaDto)
    }
}
