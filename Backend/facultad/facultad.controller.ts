import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FacultadService } from './facultad.service';
import { CreateFacultadDto } from './dto/create-facultad.dto';
import { UpdateFacultadDto } from './dto/update-facultad.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FacultadEntity } from './entities/facultad.entity';
import { PaginacionDto } from './dto/Paginacion-dto';

@ApiTags('facultades')
@Controller('facultad')
export class FacultadController {
  constructor(private readonly facultadService: FacultadService) {}

  @Post()
  @ApiOkResponse({ type: FacultadEntity })
  create(@Body() createFacultadDto: CreateFacultadDto,
  ) : Promise<FacultadEntity> {
    return this.facultadService.create(createFacultadDto);
  }

  @Get()
  @ApiOkResponse({ type: FacultadEntity,isArray: true })
  async findAll(@Query() paginacion: PaginacionDto) {
    return this.facultadService.findAll(paginacion);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facultadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacultadDto: UpdateFacultadDto) {
    return this.facultadService.update(+id, updateFacultadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facultadService.remove(+id);
  }
}
