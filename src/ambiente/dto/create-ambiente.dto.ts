import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateAmbienteDto {
    id: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nombre: string

    @ApiProperty()
    @IsNotEmpty()
    // @IsNumber()
    capacidad: number

    @ApiProperty()
    @IsNotEmpty()
    // @IsNumber()
    centroFormacion: string
}
