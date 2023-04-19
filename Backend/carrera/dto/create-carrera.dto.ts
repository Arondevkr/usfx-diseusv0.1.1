import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateCarreraDto {
    @ApiProperty()
    // @IsNotEmpty({ message: 'El campo usuario no debe ser vacío' })
    // @IsString({ message: 'El campo usuario debe ser una cadena' })
    nombre: string;
    @ApiProperty()
    // @IsNotEmpty({ message: 'El campo rol no debe ser vacío' })
    // @IsNumber({}, { message: 'El campo premium debe ser un entero' })
    idFacultad: number;

}
