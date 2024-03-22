import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'

export class CreateUsuarioDto {
    id: string

    @ApiProperty()
    nombres: string

    @ApiProperty()
    apellidos: string

    @ApiProperty()
    tipoDocumento: string

    @ApiProperty()
    numeroIdentificacion: string

    @ApiProperty()
    fechaNacimiento: Date

    @ApiProperty()
    genero: string

    @ApiProperty()
    correoElectronico: string

    @ApiProperty()
    celular: string

    @ApiProperty()
    departamento: string

    @ApiProperty()
    ciudad: string

    @ApiProperty()
    foto: string

    @ApiProperty()
    password: string

    @ApiProperty()
    poblacionEspecial: string
}
