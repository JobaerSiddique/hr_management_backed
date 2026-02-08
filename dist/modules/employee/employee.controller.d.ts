import { Request, Response, NextFunction } from 'express';
declare class EmployeeController {
    createEmployee: (req: Request, res: Response, next: NextFunction) => void;
    getEmployees: (req: Request, res: Response, next: NextFunction) => void;
    getEmployee: (req: Request, res: Response, next: NextFunction) => void;
    updateEmployee: (req: Request, res: Response, next: NextFunction) => void;
    deleteEmployee: (req: Request, res: Response, next: NextFunction) => void;
}
declare const _default: EmployeeController;
export default _default;
//# sourceMappingURL=employee.controller.d.ts.map