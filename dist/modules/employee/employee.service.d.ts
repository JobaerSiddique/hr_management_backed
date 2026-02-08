import { IEmployee, CreateEmployeeDTO, UpdateEmployeeDTO, EmployeeQueryParams } from '../../interfaces/employee';
export declare class EmployeeService {
    createEmployee(data: CreateEmployeeDTO, photoPath?: string): Promise<IEmployee>;
    getEmployees(params: EmployeeQueryParams): Promise<{
        data: IEmployee[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getEmployeeById(id: number): Promise<IEmployee>;
    updateEmployee(id: number, data: UpdateEmployeeDTO, photoPath?: string): Promise<IEmployee>;
    softDeleteEmployee(id: number): Promise<IEmployee>;
    employeeExists(id: number): Promise<boolean>;
}
declare const _default: EmployeeService;
export default _default;
//# sourceMappingURL=employee.service.d.ts.map