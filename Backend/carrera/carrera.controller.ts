import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CarreraEntity } from './entities/carrera.entity';
import { PaginacionDto } from './dto/Paginacion-dto';

@ApiTags('Carreritas')
@Controller('carrera')
export class CarreraController {
  constructor(private readonly carreraService: CarreraService) {}

  @Post()
  @ApiOkResponse({ type: CarreraEntity })
  create(@Body() createCarreraDto: CreateCarreraDto,
  ) : Promise<CarreraEntity> {
    return this.carreraService.create(createCarreraDto);
  }

  @Get()
  @ApiOkResponse({ type: CarreraEntity,isArray: true })
  async findAll(@Query() paginacion: PaginacionDto) {
    return this.carreraService.findAll(paginacion);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carreraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarreraDto: UpdateCarreraDto) {
    return this.carreraService.update(+id, updateCarreraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carreraService.remove(+id);
  }
}
