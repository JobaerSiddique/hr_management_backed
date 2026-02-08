import { Request, Response, NextFunction } from 'express';
declare class AuthController {
    login: (req: Request, res: Response, next: NextFunction) => void;
    getProfile: (req: Request, res: Response, next: NextFunction) => void;
}
declare const _default: AuthController;
export default _default;
//# sourceMappingURL=auth.controller.d.ts.map