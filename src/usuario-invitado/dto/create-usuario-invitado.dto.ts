import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateUsuarioInvitadoDto {
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
    @IsNotEmpty()
    cursoComplementarioId: string
}
