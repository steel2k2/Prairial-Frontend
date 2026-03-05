import { Component, OnInit, inject, signal } from '@angular/core';
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
    <div class="card p-4">
        <div class="flex flex-column md:flex-row md:align-items-center justify-content-between mb-4 gap-3">
            <div>
                <h1 class="text-3xl font-bold text-slate-800 dark:text-white">Gestión de Empleados</h1>
                <p class="text-slate-500 dark:text-slate-400">Administración detallada del personal y su estado.</p>
            </div>
            <div class="flex gap-2">
                <p-iconfield iconPosition="left">
                    <p-inputicon class="pi pi-search"></p-inputicon>
                    <input pInputText type="text" (input)="dt.filterGlobal($any($event.target).value, 'contains')" placeholder="Buscar empleado..." class="w-full md:w-20rem" />
                </p-iconfield>
                <p-button label="Nuevo" icon="pi pi-plus" severity="primary"></p-button>
            </div>
        </div>

        <p-table #dt [value]="employees()" [loading]="loading()" [rows]="10" [paginator]="true" 
                 [responsiveLayout]="'scroll'" styleClass="p-datatable-striped"
                 [globalFilterFields]="['firstName', 'lastName', 'email', 'dni']">
            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="firstName">Nombre <p-sortIcon field="firstName"></p-sortIcon></th>
                    <th pSortableColumn="email">Email <p-sortIcon field="email"></p-sortIcon></th>
                    <th>DNI</th>
                    <th>Cargo</th>
                    <th>Antigüedad</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-employee>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td>
                        <div class="font-medium text-slate-700 dark:text-slate-200">
                            {{employee.firstName}} {{employee.lastName}}
                        </div>
                    </td>
                    <td>{{employee.email}}</td>
                    <td>{{employee.dni}}</td>
                    <td>{{employee.positionId}}</td>
                    <td>{{calculateSeniority(employee.hireDate)}}</td>
                    <td>
                        <p-tag [value]="employee.status" [severity]="getSeverity(employee.status)"></p-tag>
                    </td>
                    <td>
                        <div class="flex gap-2">
                            <p-button icon="pi pi-pencil" [text]="true" [rounded]="true" severity="info" size="small"></p-button>
                            <p-button icon="pi pi-trash" [text]="true" [rounded]="true" severity="danger" size="small"></p-button>
                        </div>
                    </td>
                </tr>
            </ng-template>
            <ng-template pTemplate="emptymessage">
                <tr>
                    <td colspan="7" class="text-center py-8">
                        <div class="flex flex-col items-center gap-3">
                            <i class="pi pi-users text-4xl text-slate-300"></i>
                            <span class="text-slate-500">No se encontraron empleados.</span>
                        </div>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    </div>
  `,
    styleUrl: './employee-list.css'
})
export class EmployeeListComponent implements OnInit {
    private hrService = inject(HrService);

    employees = signal<Employee[]>([]);
    loading = signal<boolean>(true);

    ngOnInit() {
        this.loadEmployees();
    }

    loadEmployees() {
        this.loading.set(true);
        this.hrService.getEmployees().subscribe({
            next: (data) => {
                this.employees.set(data);
                this.loading.set(false);
            },
            error: (err) => {
                console.warn('Cargando mock data por error en API:', err);
                // Fallback mock data
                this.employees.set([
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
                ]);
                this.loading.set(false);
            }
        });
    }

    calculateSeniority(hireDate: Date): string {
        const { years, months } = this.hrService.calculateSeniority(hireDate);
        return `${years} años, ${months} meses`;
    }

    getSeverity(status: string): "success" | "secondary" | "info" | "warn" | "danger" | undefined {
        switch (status) {
            case 'active': return 'success';
            case 'on_leave': return 'warn';
            case 'inactive': return 'danger';
            default: return 'info';
        }
    }
}
