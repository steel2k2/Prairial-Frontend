import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { DashboardHomeComponent } from './dashboard/home/dashboard-home';
import { EmployeeListComponent } from './features/hr-management/employee-list/employee-list';
import { UserListComponent } from './features/usuarios/user-list/user-list.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        children: [
            { path: '', component: DashboardHomeComponent },
            { path: 'employees', component: EmployeeListComponent },
            { path: 'usuarios', component: UserListComponent }
        ]
    },
    { path: '**', redirectTo: '' }
];
