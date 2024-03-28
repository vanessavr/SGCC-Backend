import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class ApplyCursoComplementarioDto {
    @ApiProperty()
    @IsNotEmpty()
    cuposSolicitados: number

    @ApiProperty()
    usuarioId: string

    @ApiProperty()
    empresaId: string
}
