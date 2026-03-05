import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        IftaLabelModule,
        ToastModule
    ],
    providers: [MessageService],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class LoginComponent {
    private router = inject(Router);
    private messageService = inject(MessageService);
    private authService = inject(AuthService);

    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });

    loading = signal(false);

    onLogin() {
        if (this.loginForm.valid) {
            this.loading.set(true);
            const credentials = {
                username: this.loginForm.value.username!,
                password: this.loginForm.value.password!
            };

            this.authService.login(credentials).subscribe({
                next: (resp) => {
                    this.loading.set(false);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Exitoso',
                        detail: 'Ingreso correcto'
                    });

                    setTimeout(() => {
                        this.router.navigate(['/dashboard']);
                    }, 500);
                },
                error: (err) => {
                    this.loading.set(false);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error de Autenticación',
                        detail: 'Usuario o contraseña incorrectos'
                    });
                }
            });
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Atención',
                detail: 'Por favor complete el formulario correctamente'
            });
        }
    }
}
