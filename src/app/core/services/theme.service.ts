import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PrimeNG } from 'primeng/config';
import { updatePrimaryPalette } from '@primeuix/themes';

export type PrimaryColor = 'emerald' | 'blue' | 'indigo' | 'purple' | 'amber' | 'rose' | 'slate';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly THEME_KEY = 'app-theme';
    private readonly COLOR_KEY = 'app-primary-color';
    private platformId = inject(PLATFORM_ID);
    private primeng = inject(PrimeNG);

    // Signals for state management
    isDarkMode = signal<boolean>(this.getInitialTheme());
    primaryColor = signal<PrimaryColor>(this.getInitialColor());

    constructor() {
        // Effect for Dark Mode
        effect(() => {
            const isDark = this.isDarkMode();
            if (isPlatformBrowser(this.platformId)) {
                this.applyTheme(isDark);
                localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
            }
        });

        // Effect for Primary Color
        effect(() => {
            const color = this.primaryColor();
            if (isPlatformBrowser(this.platformId)) {
                this.applyPrimaryColor(color);
                localStorage.setItem(this.COLOR_KEY, color);
            }
        });
    }

    toggleTheme(): void {
        this.isDarkMode.update(dark => !dark);
    }

    setPrimaryColor(color: PrimaryColor): void {
        this.primaryColor.set(color);
    }

    private getInitialTheme(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            const savedTheme = localStorage.getItem(this.THEME_KEY);
            if (savedTheme) {
                return savedTheme === 'dark';
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    }

    private getInitialColor(): PrimaryColor {
        if (isPlatformBrowser(this.platformId)) {
            const savedColor = localStorage.getItem(this.COLOR_KEY);
            if (savedColor) {
                return savedColor as PrimaryColor;
            }
        }
        return 'emerald';
    }

    private applyTheme(isDark: boolean): void {
        const html = document.documentElement;
        if (isDark) {
            html.classList.add('p-dark');
        } else {
            html.classList.remove('p-dark');
        }
    }

    private applyPrimaryColor(color: PrimaryColor): void {
        // PrimeNG 18+ dynamic palette update
        // Note: Colors like 'emerald', 'blue', etc. are built-in presets
        // We can use updatePrimaryPalette from @primeuix/themes
        // Since we are using Aura, we can define the palette

        // For simplicity with presets, we can use the config or dynamic palette update
        // If we want to use specific hex values or built-in Aura palettes:
        const colorMap: Record<PrimaryColor, any> = {
            emerald: { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b', 950: '#022c22' },
            blue: { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554' },
            indigo: { 50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81', 950: '#1e1b4b' },
            purple: { 50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87', 950: '#3b0764' },
            amber: { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f', 950: '#451a03' },
            rose: { 50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337', 950: '#4c0519' },
            slate: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617' }
        };

        updatePrimaryPalette(colorMap[color]);
    }
}
