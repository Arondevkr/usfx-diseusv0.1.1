import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFacultadDto } from './dto/create-facultad.dto';
import { UpdateFacultadDto } from './dto/update-facultad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FacultadEntity } from './entities/facultad.entity';
import { Like, Repository } from 'typeorm';
import { PaginacionDto } from './dto/Paginacion-dto';

@Injectable()
export class FacultadService {

  constructor(
    @InjectRepository(FacultadEntity)
    private repository: Repository <FacultadEntity>
  ){}

  async create(createFacultadDto: CreateFacultadDto): Promise<FacultadEntity> {
    const facultadExistente = await this.repository.findOneBy({
      nombre: createFacultadDto.nombre.trim(),
    });
    if (facultadExistente) throw new ConflictException(`La Facultad ya existe`);

    return this.repository.save({
      nombre: createFacultadDto.nombre.trim(),
      idAreaVocacional: createFacultadDto.idAreaVocacional, // falta cifrar
      totalEstudiantes: createFacultadDto.totalEstudiantes, // falta cifrar
    });
  }

  async findAll({ busqueda, pagina, limite}:PaginacionDto){
    const busquedaNumber = parseInt(busqueda);
    const [data, totalreg] = await this.repository.findAndCount({
      skip: (pagina - 1) * limite, //saltar paginas
      take: limite, //limite de pagina
      where: busqueda
        ? [
            { nombre: Like('%' + busqueda + '%') }, //  busqueda a un string
            !isNaN(busquedaNumber) ? {} : null, //  busqueda a un numero
          ]
        : null,
      //mostrar solo coincidencia
      order: { id: 'DESC' }, //ordenar por id desendente
    });
    // estrae el total de registros
    var totalpag = Math.ceil(totalreg / limite);
    // agregar numeracion a tabla
    let numero = (pagina - 1) * limite + 1;
    for (const item of data) {
      item.numero = numero++;
    }
    const carreraList=await this.repository.find();
    // console.log(colegios);
    return { totalreg, totalpag, data };
  }

  async findOne(id: number) {
    const facultad = await this.repository.findOneBy({ id });
    if (!facultad) throw new NotFoundException(`La Facultad ${id} no existe`);
    return facultad;
  }

  async update(id: number, updateFacultadDto: UpdateFacultadDto):Promise <FacultadEntity> {
    const facultad = await this.repository.findOneBy({ id });
    if (!facultad) throw new NotFoundException(`La Facultad ${id} no existe`);

    const updatefacultad = Object.assign(facultad, updateFacultadDto);
    return this.repository.save(updatefacultad);
  }

  async remove(id: number):Promise <void> {
    const facultad = await this.repository.findOneBy({ id });
    if (!facultad) throw new NotFoundException(`La Carrera ${id} no existe`);
    await this.repository.delete(id);
  }
}
