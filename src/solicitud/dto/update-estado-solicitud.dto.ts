import { ApiProperty } from '@nestjs/swagger'

export class UpdateEstadoSolicitudDto {
    id: string

    @ApiProperty()
    motivoSolicitud: string

    @ApiProperty()
    estadoSolicitud: string
}
