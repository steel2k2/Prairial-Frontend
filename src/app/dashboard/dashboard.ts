import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { PopoverModule } from 'primeng/popover';
import { TooltipModule } from 'primeng/tooltip';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../core/services/auth.service';
import { ThemeService } from '../core/services/theme.service';

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
    InputTextModule,
    PopoverModule,
    TooltipModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  private authService = inject(AuthService);
  public themeService = inject(ThemeService);
  private router = inject(Router);

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
        { label: 'Usuarios', icon: 'pi pi-users', routerLink: '/dashboard/usuarios' },
        { label: 'Configuración', icon: 'pi pi-cog' }
      ]
    }
  ];

  userMenuItems: MenuItem[] = [
    { label: 'Perfil', icon: 'pi pi-user' },
    { label: 'Ajustes', icon: 'pi pi-cog' },
    { separator: true },
    {
      label: 'Cerrar Sesión',
      icon: 'pi pi-sign-out',
      command: () => this.logout()
    }
  ];

  stats = [
    { label: 'Usuarios Activos', value: '1,234', icon: 'pi pi-user', color: 'blue', trend: '+12%' },
    { label: 'Nuevos Ingresos', value: '45', icon: 'pi pi-plus-circle', color: 'green', trend: '+5%' },
    { label: 'Tareas Pendientes', value: '12', icon: 'pi pi-list', color: 'orange', trend: '-2%' },
    { label: 'Mensajes', value: '8', icon: 'pi pi-envelope', color: 'purple', trend: '+10%' }
  ];

  availableColors: { name: string, value: any }[] = [
    { name: 'emerald', value: '#10b981' },
    { name: 'blue', value: '#3b82f6' },
    { name: 'indigo', value: '#6366f1' },
    { name: 'purple', value: '#a855f7' },
    { name: 'amber', value: '#f59e0b' },
    { name: 'rose', value: '#f43f5e' },
    { name: 'slate', value: '#64748b' }
  ];

  setPrimaryColor(color: any) {
    this.themeService.setPrimaryColor(color as any);
  }

  toggleSidebar() {
    this.sidebarVisible.update(v => !v);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
