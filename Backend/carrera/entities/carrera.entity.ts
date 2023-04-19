import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('carrera')
export class CarreraEntity {
    numero: number; //enumeracion de registro en paginacion
    @PrimaryGeneratedColumn()
    id: number;
    @Column({length:40})
    nombre: string;
    @Column()
    idFacultad: number;
}
