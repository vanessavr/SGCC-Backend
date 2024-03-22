import { ApiProperty } from '@nestjs/swagger'
import { CreateSolicitudEmpresaDto } from './create-solicitud-empresa.dto' // Adjust the import path as needed
import { CreateResponsableSolicitudDto } from './create-responsable-solicitud.dto' // Adjust the import path as needed
import { isEmpty, isNotEmpty } from 'class-validator'

export class CreateSolicitudDto {
    @ApiProperty()
    // @isEmpty()
    fechaSolicitud: Date

    @ApiProperty()
    // @isNotEmpty()
    origenSolicitud: string

    @ApiProperty()
    // @isNotEmpty()
    radicadoSolicitud: string

    @ApiProperty()
    // @isNotEmpty()
    segmento: string

    @ApiProperty()
    // @isNotEmpty()
    cuposSolicitados: number

    @ApiProperty()
    // @isNotEmpty()
    usuarioId: string

    @ApiProperty()
    // @isNotEmpty()
    tipoSolicitud: string

    @ApiProperty()
    // @isNotEmpty()
    cursoComplementarioId: string

    @ApiProperty()
    // @isNotEmpty()
    estadoSolicitud: string

    @ApiProperty()
    // @isNotEmpty()
    motivoSolicitud: string

    // @ApiProperty({ type: CreateSolicitudEmpresaDto })
    // solicitudEmpresa: CreateSolicitudEmpresaDto

    // @ApiProperty({ type: CreateResponsableSolicitudDto })
    // // @isEmpty()
    // responsableSolicitud: CreateResponsableSolicitudDto
}
