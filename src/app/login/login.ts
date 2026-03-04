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

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });

    loading = signal(false);

    onLogin() {
        if (this.loginForm.valid) {
            this.loading.set(true);
            // Simulate API call
            setTimeout(() => {
                this.loading.set(false);
                console.log('Login success - signaling redirection...');
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exitoso',
                    detail: 'Ingreso correcto'
                });

                // Redirect to dashboard after a short delay
                setTimeout(() => {
                    console.log('Navigating to /dashboard');
                    this.router.navigate(['/dashboard']).then(success => {
                        if (success) {
                            console.log('Navigation successful!');
                        } else {
                            console.error('Navigation failed!');
                        }
                    }).catch(err => {
                        console.error('Navigation error:', err);
                    });
                }, 800);
            }, 1500);
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Por favor complete el formulario correctamente'
            });
        }
    }
}
