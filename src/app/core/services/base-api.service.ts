import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export abstract class BaseApiService {
    protected http = inject(HttpClient);
    protected baseUrl = environment.apiUrl;

    protected handleError(error: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
            // Error del lado del cliente
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Error del lado del servidor (Quarkus)
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
    }

    protected get<T>(path: string): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}/${path}`).pipe(
            catchError(this.handleError)
        );
    }

    protected post<T>(path: string, body: any): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}/${path}`, body).pipe(
            catchError(this.handleError)
        );
    }

    protected put<T>(path: string, body: any): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}/${path}`, body).pipe(
            catchError(this.handleError)
        );
    }

    protected delete<T>(path: string): Observable<T> {
        return this.http.delete<T>(`${this.baseUrl}/${path}`).pipe(
            catchError(this.handleError)
        );
    }
}
