import { PaginationParams } from "./common";
export interface IEmployee {
    id: number;
    name: string;
    age: number;
    designation: string;
    hiring_date: Date;
    date_of_birth: Date;
    salary: number;
    deleted_at: Date | null;
    photo_path?: string;
    created_at: Date;
    updated_at: Date;
}
export interface CreateEmployeeDTO {
    name: string;
    age: number;
    designation: string;
    hiring_date: Date;
    date_of_birth: Date;
    salary: number;
    deleted_at: Date;
    photo?: Express.Multer.File;
}
export interface UpdateEmployeeDTO {
    name?: string;
    age?: number;
    designation?: string;
    hiring_date?: Date;
    date_of_birth?: Date;
    salary?: number;
    deleted_at: Date;
    photo?: Express.Multer.File;
}
export interface EmployeeQueryParams extends PaginationParams {
    search?: string;
    designation?: string;
    minSalary?: number;
    maxSalary?: number;
}
//# sourceMappingURL=employee.d.ts.map