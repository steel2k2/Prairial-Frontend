export interface Role {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface Cargo {
    id: number;
    nombre: string;
    nivel: string;
    superior: Cargo | null;
}

export interface Persona {
    id: number;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    ci: string;
    email: string;
    celular: string;
    fechaNacimiento: string;
}

export interface Usuario {
    id: number;
    username: string;
    persona: Persona;
    cargo: Cargo;
    roles: Role[];
}
