import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-dashboard-home',
    standalone: true,
    imports: [CommonModule, AvatarModule, ButtonModule],
    template: `
    <!-- Stats Grid -->
    <div class="grid">
        @for (stat of stats; track stat.label) {
        <div class="col-12 md:col-6 lg:col-3">
            <div class="surface-card p-4 border-round-xl shadow-1">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">{{stat.label}}</span>
                        <div class="text-900 font-bold text-2xl">{{stat.value}}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center border-round"
                        [class]="'bg-' + stat.color + '-100'" style="width:2.5rem;height:2.5rem">
                        <i [class]="stat.icon + ' text-' + stat.color + '-500 text-xl'"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">{{stat.trend}} </span>
                <span class="text-500">desde ayer</span>
            </div>
        </div>
        }
    </div>

    <!-- Main Section -->
    <div class="grid mt-4">
        <div class="col-12 xl:col-8">
            <div class="surface-card p-4 border-round-xl shadow-1 h-full">
                <div class="flex align-items-center justify-content-between mb-4">
                    <h3 class="text-xl font-semibold m-0">Actividad Reciente</h3>
                    <p-button icon="pi pi-ellipsis-v" [text]="true"></p-button>
                </div>
                <div class="flex flex-column gap-3">
                    <div class="flex align-items-center gap-3 p-3 border-round hover:surface-hover">
                        <p-avatar icon="pi pi-user-plus" styleClass="bg-blue-100 text-blue-600"></p-avatar>
                        <div class="flex flex-column">
                            <span class="font-medium">Nuevo empleado registrado: Carlos Ruiz</span>
                            <span class="text-xs text-500">Hace 2 horas</span>
                        </div>
                    </div>
                    <div class="flex align-items-center gap-3 p-3 border-round hover:surface-hover">
                        <p-avatar icon="pi pi-file-edit" styleClass="bg-orange-100 text-orange-600"></p-avatar>
                        <div class="flex flex-column">
                            <span class="font-medium">Actualización de nómina completada</span>
                            <span class="text-xs text-500">Hace 5 horas</span>
                        </div>
                    </div>
                    <div class="flex align-items-center gap-3 p-3 border-round hover:surface-hover">
                        <p-avatar icon="pi pi-calendar" styleClass="bg-green-100 text-green-600"></p-avatar>
                        <div class="flex flex-column">
                            <span class="font-medium">Reunión de equipo RRHH</span>
                            <span class="text-xs text-500">Ayer</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 xl:col-4">
            <div class="surface-card p-4 border-round-xl shadow-1 h-full">
                <h3 class="text-xl font-semibold mb-4">Próximos Cumpleaños</h3>
                <div class="flex flex-column gap-4">
                    <div class="flex align-items-center gap-3">
                        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png"
                            shape="circle"></p-avatar>
                        <div class="flex flex-column flex-1">
                            <span class="font-medium">Onya Malimba</span>
                            <span class="text-sm text-500">Mañana</span>
                        </div>
                        <i class="pi pi-gift text-pink-500"></i>
                    </div>
                    <div class="flex align-items-center gap-3">
                        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiakanay.png"
                            shape="circle"></p-avatar>
                        <div class="flex flex-column flex-1">
                            <span class="font-medium">Asiak Anay</span>
                            <span class="text-sm text-500">5 de Marzo</span>
                        </div>
                        <i class="pi pi-gift text-pink-500"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `,
    styles: []
})
export class DashboardHomeComponent {
    stats = [
        { label: 'Usuarios Activos', value: '1,234', icon: 'pi pi-user', color: 'blue', trend: '+12%' },
        { label: 'Nuevos Ingresos', value: '45', icon: 'pi pi-plus-circle', color: 'green', trend: '+5%' },
        { label: 'Tareas Pendientes', value: '12', icon: 'pi pi-list', color: 'orange', trend: '-2%' },
        { label: 'Mensajes', value: '8', icon: 'pi pi-envelope', color: 'purple', trend: '+10%' }
    ];
}
