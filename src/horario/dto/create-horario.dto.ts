import { ApiProperty } from '@nestjs/swagger'

export class CreateHorarioDto {
    id: string

    @ApiProperty()
    cursoComplementarioId: string

    @ApiProperty()
    ambienteId: string

    @ApiProperty()
    fechaHoraInicio: Date

    @ApiProperty()
    fechaHoraFin: Date

    @ApiProperty()
    instructorId: string
}
