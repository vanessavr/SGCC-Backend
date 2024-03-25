import { ApiProperty } from '@nestjs/swagger'
import { IsEmpty, IsNotEmpty } from 'class-validator'

export class CreateUsuarioDto {
    id: string

    @ApiProperty()
    @IsNotEmpty()
    nombres: string

    @ApiProperty()
    @IsNotEmpty()
    apellidos: string

    @ApiProperty()
    @IsNotEmpty()
    tipoDocumento: string

    @ApiProperty()
    @IsNotEmpty()
    numeroIdentificacion: string

    @ApiProperty()
    @IsNotEmpty()
    fechaNacimiento: Date

    @ApiProperty()
    @IsNotEmpty()
    genero: string

    @ApiProperty()
    @IsNotEmpty()
    correoElectronico: string

    @ApiProperty()
    @IsNotEmpty()
    celular: string

    @ApiProperty()
    @IsNotEmpty()
    departamento: string

    @ApiProperty()
    @IsNotEmpty()
    ciudad: string

    @ApiProperty()
    foto: string

    @ApiProperty()
    @IsNotEmpty()
    password: string

    @ApiProperty()
    @IsNotEmpty()
    poblacionEspecial: string
}
