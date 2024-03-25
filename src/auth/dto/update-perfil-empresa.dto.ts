import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class UpdatePerfilEmpresaDto {
    id: string

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
}
