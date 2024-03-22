import { ApiProperty } from "@nestjs/swagger"

export class CreateEmpresaDto {
    id: string

    @ApiProperty()
    nit: string

    @ApiProperty()
    representanteLegal: string

    @ApiProperty()
    razonSocial: string

    @ApiProperty()
    correoElectronico: string

    @ApiProperty()
    celular: string

    @ApiProperty()
    direccion: string

    @ApiProperty()
    actividadEconomica: string

    @ApiProperty()
    departamento: string

    @ApiProperty()
    ciudad: string

    @ApiProperty()
    password: string
}
