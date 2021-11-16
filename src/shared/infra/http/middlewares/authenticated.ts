import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { verify, Secret } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function authenticated(
  request: Request,
  Response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token not provided.', 401);
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret as Secret);

    const { sub } = decoded as ITokenPayload;
    request.user = {
      id: sub,
    };

    next();
  } catch {
    throw new AppError(' Invalid Jwt token');
  }
}
