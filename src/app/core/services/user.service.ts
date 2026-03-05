import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/user.models';
import { BaseApiService } from './base-api.service';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseApiService {

    constructor() {
        super();
    }

    /**
     * Obtiene la lista de usuarios desde el backend
     */
    getUsuarios(): Observable<Usuario[]> {
        // Usamos el método get heredado que añade el prefijo /api
        // El proxy se encargará de reescribir /api a vacío si es necesario
        return this.get<Usuario[]>('usuarios');
    }
}
