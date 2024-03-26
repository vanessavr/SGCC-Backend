import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateRolDto {
    id: string

    @ApiProperty()
    @IsNotEmpty()
    nombre: string

    @ApiProperty()
    @IsNotEmpty()
    descripcion: string
}
