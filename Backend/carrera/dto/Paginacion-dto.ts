import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class PaginacionDto {
  // limite de paginas
  @IsOptional()
  @ApiProperty({default: 10, required: false})
  limite: number;

  //pagina actual
  @IsOptional()
  @ApiProperty({default: 1, required: false})
  pagina: number;

  // variable para busqueda
  @IsOptional()
  @ApiProperty({required: false})
  busqueda: string;
  
}
