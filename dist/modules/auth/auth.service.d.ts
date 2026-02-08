import { LoginDTO, AuthResponse } from '../../interfaces/auth';
import { IUser } from '../../interfaces/auth';
export declare class AuthService {
    login(data: LoginDTO): Promise<AuthResponse>;
    getProfile(userId: number): Promise<Partial<IUser>>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=auth.service.d.ts.map