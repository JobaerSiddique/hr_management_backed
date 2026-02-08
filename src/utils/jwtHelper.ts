import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
type JwtExpires = number | `${number}${'s' | 'm' | 'h' | 'd'}`;
const generateToken = (
  payload: string | object | Buffer,
  secret: Secret,
  expiresIn: JwtExpires
): string => {
  const options: SignOptions = {
    algorithm: 'HS256',
    expiresIn
  };
  
  return jwt.sign(payload, secret, options);
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  generateToken,
  verifyToken
};
