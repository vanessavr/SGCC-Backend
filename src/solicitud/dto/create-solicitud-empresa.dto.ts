import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateSolicitudEmpresaDto {
    @ApiProperty()
    @IsNotEmpty()
    empresaId: string

    @ApiProperty()
    @IsNotEmpty()
    solicitudId: string
}
