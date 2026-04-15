import jwt from 'jsonwebtoken';

export interface TokenPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

export class AuthService {
  private readonly secret: string;
  private readonly accessTokenTTL: string;
  private readonly refreshTokenTTL: string;

  constructor(secret: string, accessTokenTTL = '1h', refreshTokenTTL = '7d') {
    this.secret = secret;
    this.accessTokenTTL = accessTokenTTL;
    this.refreshTokenTTL = refreshTokenTTL;
  }

  generateToken(userId: string): string {
    return jwt.sign({ userId }, this.secret, { expiresIn: this.accessTokenTTL });
  }

  generateRefreshToken(userId: string): string {
    return jwt.sign({ userId, type: 'refresh' }, this.secret, { expiresIn: this.refreshTokenTTL });
  }

  verifyToken(token: string): TokenPayload {
    return jwt.verify(token, this.secret) as TokenPayload;
  }

  refreshToken(refreshToken: string): { accessToken: string; refreshToken: string } {
    const payload = this.verifyToken(refreshToken);
    return {
      accessToken: this.generateToken(payload.userId),
      refreshToken: this.generateRefreshToken(payload.userId),
    };
  }
}
