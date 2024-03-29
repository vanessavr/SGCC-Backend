import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class UpdateEstadoSolicitudDto {
    id: string

    @ApiProperty()
    motivoSolicitud: string

    @ApiProperty()
    estadoSolicitud: string
}
