import { JwtPayload, Secret } from 'jsonwebtoken';
type JwtExpires = number | `${number}${'s' | 'm' | 'h' | 'd'}`;
export declare const jwtHelpers: {
    generateToken: (payload: string | object | Buffer, secret: Secret, expiresIn: JwtExpires) => string;
    verifyToken: (token: string, secret: Secret) => JwtPayload;
};
export {};
//# sourceMappingURL=jwtHelper.d.ts.map