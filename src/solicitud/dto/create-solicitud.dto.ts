import { ApiProperty } from '@nestjs/swagger'
import { IsEmpty, IsNotEmpty } from 'class-validator'
import { CreateSolicitudEmpresaDto } from './create-solicitud-empresa.dto' // Adjust the import path as needed
import { CreateResponsableSolicitudDto } from './create-responsable-solicitud.dto' // Adjust the import path as needed

export class CreateSolicitudDto {
    @ApiProperty()
    @IsEmpty()
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
    @IsNotEmpty()
    usuarioId: string

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

    // @ApiProperty({ type: CreateSolicitudEmpresaDto })
    // solicitudEmpresa: CreateSolicitudEmpresaDto

    // @ApiProperty({ type: CreateResponsableSolicitudDto })
    // // @isEmpty()
    // responsableSolicitud: CreateResponsableSolicitudDto
}
