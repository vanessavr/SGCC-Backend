import { ApiProperty } from '@nestjs/swagger'
import { IsEmpty, IsNotEmpty } from 'class-validator'

export class CreateCursoComplementarioDto {
    id: string

    @ApiProperty()
    @IsNotEmpty()
    nombre: string

    @ApiProperty()
    @IsNotEmpty()
    areaFormacion: string

    @ApiProperty()
    @IsNotEmpty()
    fichaFormacion: string

    @ApiProperty()
    @IsNotEmpty()
    centroFormacion: string

    @ApiProperty()
    @IsNotEmpty()
    jornada: string

    @ApiProperty()
    @IsNotEmpty()
    instructorId: string

    @ApiProperty()
    @IsNotEmpty()
    ambienteId: string

    @ApiProperty()
    @IsNotEmpty()
    departamento: string

    @ApiProperty()
    @IsNotEmpty()
    ciudad: string

    @ApiProperty()
    cuposDisponibles: number

    @ApiProperty()
    @IsNotEmpty()
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
