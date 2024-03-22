import { ApiProperty } from '@nestjs/swagger'

export class CreateCursoComplementarioDto {
    id: string

    @ApiProperty()
    nombre: string

    @ApiProperty()
    areaFormacion: string

    @ApiProperty()
    fichaFormacion: string

    @ApiProperty()
    centroFormacion: string

    @ApiProperty()
    jornada: string

    @ApiProperty()
    instructorId: string

    @ApiProperty()
    ambienteId: string

    @ApiProperty()
    departamento: string

    @ApiProperty()
    ciudad: string

    @ApiProperty()
    cuposDisponibles: number

    @ApiProperty()
    duracion: number

    @ApiProperty()
    fechaInicio: Date

    @ApiProperty()
    fechaFin: Date

    @ApiProperty()
    imagen: string

    @ApiProperty()
    descripcion: string
}
