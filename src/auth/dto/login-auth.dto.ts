import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class LoginAuthDto {
    @ApiProperty()
    @IsString()
    numeroIdentificacion: string

    @ApiProperty()
    @IsString()
    password: string
}
