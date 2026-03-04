export interface Department {
    id: string;
    name: string;
    description?: string;
    parentDepartmentId?: string; // Para estructura jerárquica
}

export interface Position {
    id: string;
    title: string;
    baseSalary: number;
    departmentId: string;
}

export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    dni: string;
    hireDate: Date;
    positionId: string;
    departmentId: string;
    status: 'active' | 'inactive' | 'on_leave';
    photoUrl?: string;
}

export interface AttendanceRecord {
    id: string;
    employeeId: string;
    date: Date;
    clockIn: Date;
    clockOut?: Date;
    status: 'present' | 'absent' | 'late' | 'early_departure';
    location?: string; // GPS o IP opcional
}

export interface SalaryPayment {
    id: string;
    employeeId: string;
    periodStart: Date;
    periodEnd: Date;
    grossSalary: number;
    netSalary: number;
    deductions: {
        label: string;
        amount: number;
    }[];
    bonuses: {
        label: string;
        amount: number;
    }[];
    paymentDate: Date;
    seniorityBonus: number; // Basado en antigüedad
}

export interface HRSummary {
    seniorityYears: number;
    seniorityMonths: number;
    currentSalary: number;
    lastAttendance?: AttendanceRecord;
}
