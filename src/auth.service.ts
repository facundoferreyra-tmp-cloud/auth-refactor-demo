import jwt from 'jsonwebtoken';

export class AuthService {
  private readonly secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  generateToken(userId: string): string {
    return jwt.sign({ userId }, this.secret, { expiresIn: '1h' });
  }

  verifyToken(token: string): { userId: string } {
    return jwt.verify(token, this.secret) as { userId: string };
  }

  // TODO: refactor to support refresh tokens
  refreshToken(token: string): string {
    const payload = this.verifyToken(token);
    return this.generateToken(payload.userId);
  }
}
