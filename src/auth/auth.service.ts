import { Injectable, Req, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { EmpresaService } from 'src/empresa/empresa.service'
import { UsuarioService } from 'src/usuario/usuario.service'

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private readonly empresaService: EmpresaService,
        private readonly usuarioService: UsuarioService,
    ) {}

    async getProfileData(@Req() req: Request) {
        const accessToken = req.headers['authorization']?.split(' ')[1] // Use optional chaining to avoid errors if 'authorization' header is missing

        if (!accessToken) {
            throw new UnauthorizedException('Token de acceso no proporcionado')
        }

        const tokenData = await this.getUserFromToken(accessToken)

        let result: any = null

        // Comprueba si el token representa un usuario o una empresa
        if (tokenData) {
            if (tokenData.rolId == 'd7f72697-7937-490a-953d-26bd122d6c3e') {
                result = await this.empresaService.findOne(tokenData.id)
            } else {
                result = await this.usuarioService.findOne(tokenData.id)
            }
        }

        return result
    }

    async getUserFromToken(token: string): Promise<any> {
        try {
            const payload = this.jwtService.verify(token)

            delete payload.iat
            delete payload.exp

            // Aquí podrías consultar la base de datos u otro sistema de almacenamiento para obtener los datos del usuario
            // En este ejemplo, supondremos que el payload contiene directamente los datos del usuario
            return payload
        } catch (error) {
            throw new UnauthorizedException('Token inválido')
        }
    }
}
