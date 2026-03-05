import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { UserService } from '../../../core/services/user.service';
import { Usuario } from '../../../core/models/user.models';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        TagModule,
        IconFieldModule,
        InputIconModule,
        TooltipModule
    ],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
    private userService = inject(UserService);

    users = signal<Usuario[]>([]);
    loading = signal<boolean>(false);
    searchValue = '';

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.loading.set(true);
        this.userService.getUsuarios().subscribe({
            next: (data) => {
                this.users.set(data);
                this.loading.set(false);
            },
            error: (err) => {
                console.error('Error loading users:', err);
                this.loading.set(false);
            }
        });
    }

    getSeverity(role: string): "success" | "secondary" | "info" | "warn" | "danger" | undefined {
        switch (role) {
            case 'SUPER_ADMIN':
                return 'danger';
            case 'ADMINISTRADOR':
                return 'warn';
            case 'SUPERVISOR':
                return 'info';
            case 'USUARIO':
                return 'success';
            default:
                return 'secondary';
        }
    }
}
