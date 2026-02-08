import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from '../interfaces/common';
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}
export declare const auth: (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map