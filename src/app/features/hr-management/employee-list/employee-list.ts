import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Employee } from '../../../core/models/hr.models';
import { HrService } from '../../../core/services/hr.service';

@Component({
    selector: 'app-employee-list',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        TagModule,
        IconFieldModule,
        InputIconModule
    ],
    template: `
    <div class="surface-card p-4 border-round-xl shadow-1">
        <div class="flex flex-column md:flex-row md:align-items-center justify-content-between mb-4 gap-3">
            <h2 class="text-2xl font-bold m-0">Gestión de Empleados</h2>
            <div class="flex gap-2">
                <p-iconfield iconPosition="left">
                    <p-inputicon class="pi pi-search"></p-inputicon>
                    <input pInputText type="text" (input)="onSearch($event)" placeholder="Buscar empleado..." class="w-full md:w-20rem" />
                </p-iconfield>
                <p-button label="Nuevo" icon="pi pi-plus" severity="primary"></p-button>
            </div>
        </div>

        <p-table [value]="employees" [loading]="loading" [rows]="10" [paginator]="true" 
                 [responsiveLayout]="'scroll'" styleClass="p-datatable-sm">
            <ng-template pTemplate="header">
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>DNI</th>
                    <th>Cargo</th>
                    <th>Antigüedad</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-employee>
                <tr>
                    <td>{{employee.firstName}} {{employee.lastName}}</td>
                    <td>{{employee.email}}</td>
                    <td>{{employee.dni}}</td>
                    <td>{{employee.positionId}}</td>
                    <td>{{calculateSeniority(employee.hireDate)}}</td>
                    <td>
                        <p-tag [value]="employee.status" [severity]="getSeverity(employee.status)"></p-tag>
                    </td>
                    <td>
                        <div class="flex gap-2">
                            <p-button icon="pi pi-pencil" [text]="true" severity="secondary"></p-button>
                            <p-button icon="pi pi-trash" [text]="true" severity="danger"></p-button>
                        </div>
                    </td>
                </tr>
            </ng-template>
            <ng-template pTemplate="emptymessage">
                <tr>
                    <td colspan="7" class="text-center p-4">No se encontraron empleados.</td>
                </tr>
            </ng-template>
        </p-table>
    </div>
  `,
    styles: [`
    :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
        background: var(--surface-ground);
    }
  `]
})
export class EmployeeListComponent implements OnInit {
    private hrService = inject(HrService);

    employees: Employee[] = [];
    loading: boolean = true;

    ngOnInit() {
        this.loadEmployees();
    }

    loadEmployees() {
        this.hrService.getEmployees().subscribe({
            next: (data) => {
                this.employees = data;
                this.loading = false;
            },
            error: () => {
                // En caso de error (ej. backend no listo), cargamos datos de ejemplo
                this.employees = [
                    {
                        id: '1',
                        firstName: 'Carlos',
                        lastName: 'Ruiz',
                        email: 'carlos.ruiz@example.com',
                        dni: '12345678',
                        hireDate: new Date('2020-01-15'),
                        positionId: 'Desarrollador Senior',
                        departmentId: 'TI',
                        status: 'active'
                    },
                    {
                        id: '2',
                        firstName: 'Ana',
                        lastName: 'García',
                        email: 'ana.garcia@example.com',
                        dni: '87654321',
                        hireDate: new Date('2022-06-20'),
                        positionId: 'Analista RRHH',
                        departmentId: 'RRHH',
                        status: 'active'
                    }
                ];
                this.loading = false;
            }
        });
    }

    calculateSeniority(hireDate: Date): string {
        const { years, months } = this.hrService.calculateSeniority(hireDate);
        return `${years} años, ${months} meses`;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'active': return 'success';
            case 'on_leave': return 'warn';
            case 'inactive': return 'danger';
            default: return 'info';
        }
    }

    onSearch(event: any) {
        // Implementar búsqueda local o remota
    }
}
