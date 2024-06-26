import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

export class UpdatePerfilPersonaDto {
    id: string

    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
    fechaNacimiento: Date

    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
    correoElectronico: string

    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
    celular: string

    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
    departamento: string

    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
    ciudad: string
}
