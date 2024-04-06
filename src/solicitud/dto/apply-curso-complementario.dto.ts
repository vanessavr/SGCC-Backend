import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

export class ApplyCursoComplementarioDto {
    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
    cuposSolicitados: number

    @ApiProperty()
    usuarioId: string

    @ApiProperty()
    empresaId: string
}
