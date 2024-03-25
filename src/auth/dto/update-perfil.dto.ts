import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class UpdatePerfilDto {
    id: string

    @ApiProperty()
    @IsNotEmpty()
    nombres: string

    @ApiProperty()
    @IsNotEmpty()
    apellidos: string

    @ApiProperty()
    @IsNotEmpty()
    fechaNacimiento: Date

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
}
