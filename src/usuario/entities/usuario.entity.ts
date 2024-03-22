import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    nombres: string

    @Column()
    apellidos: string

    @Column()
    tipoDocumento: string

    @Column()
    numeroIdentificacion: string

    @Column()
    fechaNacimiento: Date

    @Column()
    genero: string

    @Column()
    correoElectronico: string

    @Column()
    celular: string

    @Column()
    departamento: string

    @Column()
    ciudad: string

    @Column()
    foto: string

    @Column()
    password: string

    @Column()
    poblacionEspecial: string
}
