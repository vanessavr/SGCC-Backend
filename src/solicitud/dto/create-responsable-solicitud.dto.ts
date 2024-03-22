import { ApiProperty } from '@nestjs/swagger'

export class CreateResponsableSolicitudDto {
    @ApiProperty()
    usuarioId: string

    @ApiProperty()
    solicitudId: string
}
