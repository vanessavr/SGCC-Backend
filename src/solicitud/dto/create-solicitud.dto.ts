import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateSolicitudDto {
    @ApiProperty()
    fechaSolicitud: Date

    @ApiProperty()
    @IsNotEmpty()
    origenSolicitud: string

    @ApiProperty()
    @IsNotEmpty()
    radicadoSolicitud: string

    @ApiProperty()
    @IsNotEmpty()
    segmento: string

    @ApiProperty()
    @IsNotEmpty()
    cuposSolicitados: number

    @ApiProperty()
    usuarioId: string

    @ApiProperty()
    empresaId: string

    @ApiProperty()
    @IsNotEmpty()
    tipoSolicitud: string

    @ApiProperty()
    @IsNotEmpty()
    cursoComplementarioId: string

    @ApiProperty()
    @IsNotEmpty()
    estadoSolicitud: string

    @ApiProperty()
    @IsNotEmpty()
    motivoSolicitud: string
}
