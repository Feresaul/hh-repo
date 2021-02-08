/*export interface Usuario_login {
  username: string;
  password: string;
}

export interface Usuario_tabla {
  nombre: string;
  id: number;
  usuario: string;
  cargo: string;
}

export interface Usuario {
  id: number;
  original_id: number;
  first_name: string;
  last_name: string;
  username: string;
  hash: string;
  salt: string;
  shift: string;
  status: string;
  created_at: string;
  created_by: string;
}

export interface Usuario_medico {
  usuario: string;
  contrasenia: string;
  cargo: string[];
  medico: Medico;
}

//Recetas

export interface Medicamento {
  index: number;
  nombre: string;
  clave: string;
  presentacion: string;
  empaque: string;
  cantidad: Number;
  dosificacion: string;
  dias: number;
  viaAdministracion: string;
}

export interface Medico {
  id: number;
  nombre: string;
  especialidad: string;
  cedula: string;
  universidad: string;
  turno: string;
  direccion: string;
}

export class Paciente {
  id: number;
  curp: string;
  nombre: string;
  domicilio: string;
  edad: number;
  sexo: string;
}

export class Receta {
  id: number;
  folio: string;
  fecha: string;
  paciente: Paciente;
  medico: Medico;
  diagnostico: string;
  medicamentos: Medicamento[];
  indicaciones: string;
}

export interface Receta_paciente {
  folio: string;
  fecha: string;
  medico: string;
  paciente: string;
}
*/