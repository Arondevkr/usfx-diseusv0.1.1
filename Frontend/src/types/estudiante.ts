export interface Estudiante {
  numero: number;
  id: number;
  nombre: string;
  rude: number;
  carnet: number;
  fechaNacimiento: Date;
  idColegio: number;
  idCarreraSeleccionada: number;
  idAreaSeleccionada: number;
  
  relcolegio:relcolegio;

}
export interface relcolegio {
  id: number;
  nombre: string;
}
