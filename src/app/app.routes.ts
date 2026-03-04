import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { DashboardHomeComponent } from './dashboard/home/dashboard-home';
import { EmployeeListComponent } from './features/hr-management/employee-list/employee-list';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: '', component: DashboardHomeComponent },
            { path: 'employees', component: EmployeeListComponent }
        ]
    },
    { path: '**', redirectTo: '' }
];
