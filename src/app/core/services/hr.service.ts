import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, HRSummary, AttendanceRecord } from '../models/hr.models';
import { BaseApiService } from './base-api.service';

@Injectable({
    providedIn: 'root'
})
export class HrService extends BaseApiService {

    constructor() {
        super();
    }

    /**
     * Obtiene la lista de empleados desde el backend de Quarkus
     */
    getEmployees(): Observable<Employee[]> {
        return this.get<Employee[]>('employees');
    }

    /**
     * Registra una marcación de entrada/salida
     */
    registerAttendance(attendance: Partial<AttendanceRecord>): Observable<AttendanceRecord> {
        return this.post<AttendanceRecord>('attendance', attendance);
    }

    /**
     * Calcula la antigüedad del empleado en años y meses
     * @param hireDate Fecha de ingreso
     */
    calculateSeniority(hireDate: Date): { years: number, months: number } {
        const today = new Date();
        const hire = new Date(hireDate);

        let years = today.getFullYear() - hire.getFullYear();
        let months = today.getMonth() - hire.getMonth();

        if (months < 0 || (months === 0 && today.getDate() < hire.getDate())) {
            years--;
            months += 12;
        }

        if (today.getDate() < hire.getDate()) {
            months--;
        }

        return { years, months };
    }

    /**
     * Obtiene un resumen consolidado para un empleado
     */
    getEmployeeSummary(employee: Employee): Observable<HRSummary> {
        // Aquí podríamos combinar antigüedad local con datos remotos de salario
        return this.get<HRSummary>(`employees/${employee.id}/summary`);
    }
}
