import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CambiarPasswordDto {
    id: string

    @ApiProperty()
    @IsNotEmpty()
    oldPassword: string

    @ApiProperty()
    @IsNotEmpty()
    newPassword: string

    @ApiProperty()
    @IsNotEmpty()
    userId: string
}
