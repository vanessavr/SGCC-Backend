import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Usuario } from '@prisma/client'

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async getUserFromToken(token: string): Promise<Usuario> {
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
