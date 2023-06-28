import jwt from 'jsonwebtoken';
import { TokenPayload } from '../types/TokenPayload';

const SECRET = process.env.JWT_SECRET || 'you-shall-not-pass';

// const jwtConfig = { expiresIn: '1y', algorithm: 'HS256' };

export const tokenGenerator = (payload: TokenPayload): string => jwt.sign(payload, SECRET);

export const decodedToken = (token: string): TokenPayload =>
  jwt.verify(token, SECRET) as TokenPayload;
