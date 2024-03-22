import { ApiProperty } from '@nestjs/swagger'

export class CreateSolicitudEmpresaDto {
    @ApiProperty()
    empresaId: string

    @ApiProperty()
    solicitudId: string
}
