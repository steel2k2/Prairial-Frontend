import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DrawerModule,
    ButtonModule,
    AvatarModule,
    MenuModule,
    BadgeModule,
    RippleModule,
    InputTextModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  sidebarVisible = signal(true);

  menuItems: MenuItem[] = [
    {
      label: 'Principal',
      items: [
        { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' },
        { label: 'Análisis', icon: 'pi pi-chart-line' }
      ]
    },
    {
      label: 'Administración',
      items: [
        { label: 'Usuarios', icon: 'pi pi-users', routerLink: '/dashboard/employees' },
        { label: 'Configuración', icon: 'pi pi-cog' }
      ]
    }
  ];

  userMenuItems: MenuItem[] = [
    { label: 'Perfil', icon: 'pi pi-user' },
    { label: 'Ajustes', icon: 'pi pi-cog' },
    { separator: true },
    { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', routerLink: '/' }
  ];

  stats = [
    { label: 'Usuarios Activos', value: '1,234', icon: 'pi pi-user', color: 'blue', trend: '+12%' },
    { label: 'Nuevos Ingresos', value: '45', icon: 'pi pi-plus-circle', color: 'green', trend: '+5%' },
    { label: 'Tareas Pendientes', value: '12', icon: 'pi pi-list', color: 'orange', trend: '-2%' },
    { label: 'Mensajes', value: '8', icon: 'pi pi-envelope', color: 'purple', trend: '+10%' }
  ];

  toggleSidebar() {
    this.sidebarVisible.update(v => !v);
  }
}
