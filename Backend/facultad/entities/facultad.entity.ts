import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity('facultad')
export class FacultadEntity {
    numero:number; //enumeracion de registro en paginacion
    @PrimaryGeneratedColumn()
    id: number;
    @Column({length:40})
    nombre:string;
    @Column()
    idAreaVocacional:number;
    @Column()
    totalEstudiantes:number;
}
