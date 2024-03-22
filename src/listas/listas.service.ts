import { Get, Injectable } from '@nestjs/common'
import * as fs from 'fs'

@Injectable()
export class ListasService {
    async getActividadesEconomicas(): Promise<any> {
        try {
            const data = fs.readFileSync('data/actividades-economicas.json', 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            throw new Error('Error al leer el archivo JSON')
        }
    }

    async getDepartamentos(): Promise<any> {
        try {
            const data = fs.readFileSync('data/colombia.json', 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            throw new Error('Error al leer el archivo JSON')
        }
    }

    async getCiudades(id: number): Promise<any> {
        try {
            const data = fs.readFileSync('data/colombia.json', 'utf-8')
            const parsedData = JSON.parse(data)
            const departamento = parsedData.find((item) => item.id === +id)
            if (!departamento) {
                throw new Error(`No se encontró ningún departamento con el ID ${id}`)
            }
            return departamento
        } catch (error) {
            throw new Error('Error al leer el archivo JSON')
        }
    }
}
