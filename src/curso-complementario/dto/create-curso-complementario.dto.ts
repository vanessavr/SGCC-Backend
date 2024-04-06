import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

export class CreateCursoComplementarioDto {
    id: string

    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
    nombre: string

    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
    areaFormacion: string

    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
    fichaFormacion: string

    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
    centroFormacion: string

    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
    jornada: string

    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
    instructorId: string

    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
    ambienteId: string

    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
    departamento: string

    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
    ciudad: string

    @ApiProperty()
    cuposDisponibles: number

    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
    duracion: number

    @ApiProperty()
    fechaInicio: Date

    @ApiProperty()
    fechaFin: Date

    @ApiProperty()
    imagen: string

    @ApiProperty()
    descripcion: string

    @ApiProperty()
    flyer: string

    @ApiProperty()
    horarioDescripcion: string
}
