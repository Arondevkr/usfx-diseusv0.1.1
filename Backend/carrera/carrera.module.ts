import { Module } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { CarreraController } from './carrera.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarreraEntity } from './entities/carrera.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarreraEntity])],
  controllers: [CarreraController],
  providers: [CarreraService]
})
export class CarreraModule {}
