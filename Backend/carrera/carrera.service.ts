import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CarreraEntity } from './entities/carrera.entity';
import { Equal, Like, Repository } from 'typeorm';
import { PaginacionDto } from './dto/Paginacion-dto';

@Injectable()
export class CarreraService {

  constructor(
    @InjectRepository(CarreraEntity)
    private repository: Repository <CarreraEntity>,

  ) {}

  //  Crear Registro

  async create(
    createCarreraDto: CreateCarreraDto): Promise<CarreraEntity> {
      const newCarrera = await this.repository.save({
        nombre: createCarreraDto.nombre,
        idFacultad: createCarreraDto.idFacultad,
      });
      return newCarrera;
  }

  async findAll({ busqueda, pagina, limite}:PaginacionDto) {
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

  async findOne(id: number): Promise <CarreraEntity> {
    const carrera = await this.repository.findOneBy({ id });
    if (!carrera) throw new NotFoundException(`La Carrera ${id} no existe`);
    return carrera;
  }

  async update(id: number, updateCarreraDto: UpdateCarreraDto): Promise<CarreraEntity> {
    const existe = await this.repository.findOne({ where: { id } });
    if (!existe) throw new NotFoundException(`La Carrea ${id} no existe.`);

    const updateCarrera = Object.assign(existe, updateCarreraDto);
    return await this.repository.save(updateCarrera);
  }

  async remove(id: number): Promise <void> {
    const carrera = await this.repository.findOneBy({ id });
    if (!carrera) throw new NotFoundException(`La Carrera ${id} no existe`);
    await this.repository.delete(id);
  }
}
