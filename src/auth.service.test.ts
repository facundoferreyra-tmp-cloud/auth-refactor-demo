import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService('test-secret');
  });

  it('should generate a valid token', () => {
    const token = service.generateToken('user123');
    expect(token).toBeDefined();
  });

  it('should verify a valid token', () => {
    const token = service.generateToken('user123');
    const payload = service.verifyToken(token);
    expect(payload.userId).toBe('user123');
  });

  // FAILING: refresh token should return new token with extended expiry
  it('should refresh token with new expiry', () => {
    const token = service.generateToken('user123');
    const refreshed = service.refreshToken(token);
    expect(refreshed).not.toBe(token);
    const payload = service.verifyToken(refreshed);
    expect(payload.userId).toBe('user123');
    // This assertion fails — expiry is not extended
    expect(payload).toHaveProperty('exp');
  });
});
