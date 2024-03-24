import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateResponsableSolicitudDto {
    @ApiProperty()
    @IsNotEmpty()
    usuarioId: string

    @ApiProperty()
    @IsNotEmpty()
    solicitudId: string
}
