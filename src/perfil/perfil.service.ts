import { Injectable } from '@nestjs/common'
import { UpdatePerfilDto } from './dto/update-perfil.dto'

@Injectable()
export class PerfilService {
    findAll() {
        return `This action returns all perfil`
    }

    findOne(id: string) {
        return `This action returns a #${id} perfil`
    }

    update(id: string, updatePerfilDto: UpdatePerfilDto) {
        return `This action updates a #${id} perfil`
    }

    remove(id: string) {
        return `This action removes a #${id} perfil`
    }
}
