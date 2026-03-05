import { Injectable, signal } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseApiService {
    private readonly TOKEN_KEY = 'auth_token';

    // Signal to track auth state
    isAuthenticated = signal<boolean>(this.hasToken());

    login(credentials: { username: string; password: string }): Observable<LoginResponse> {
        // Note: Use /auth/login as specified in the image
        // BaseApiService uses baseUrl = environment.apiUrl (http://localhost:8080/api)
        // The image shows http://localhost:8080/auth/login
        // We can either change the BaseApiService path handling or use a relative path if supported.
        // Given the image, it seems the auth endpoint is outside /api. 
        // I'll use a direct path for now or assume BaseApiService can handle absolute-like paths.

        return this.http.post<LoginResponse>(`/auth/login`, credentials).pipe(
            tap(response => {
                if (response.token) {
                    this.setToken(response.token);
                    this.isAuthenticated.set(true);
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        this.isAuthenticated.set(false);
    }

    private setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    private hasToken(): boolean {
        return !!this.getToken();
    }

    isLoggedIn(): boolean {
        return this.isAuthenticated();
    }
}
