import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateEmpresaDto {
    id: string

    @ApiProperty()
    @IsNotEmpty()
    nit: string

    @ApiProperty()
    @IsNotEmpty()
    representanteLegal: string

    @ApiProperty()
    @IsNotEmpty()
    razonSocial: string

    @ApiProperty()
    @IsNotEmpty()
    correoElectronico: string

    @ApiProperty()
    @IsNotEmpty()
    celular: string

    @ApiProperty()
    @IsNotEmpty()
    direccion: string

    @ApiProperty()
    @IsNotEmpty()
    actividadEconomica: string

    @ApiProperty()
    @IsNotEmpty()
    departamento: string

    @ApiProperty()
    @IsNotEmpty()
    ciudad: string

    @ApiProperty()
    @IsNotEmpty()
    password: string

    @ApiProperty()
    foto: string
}
