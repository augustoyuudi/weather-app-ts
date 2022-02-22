import AuthService from '@src/services/auth';
import { authMiddleware } from '../auth';

describe('Auth middleware', () => {
  it('should verify a JWT token and call the next middleware', () => {
    const jwtToken = AuthService.generateToken({ data: 'fake' });
    const fakeRequest = {
      headers: {
        'x-access-token': jwtToken,
      }
    };
    const fakeResponse = {};
    const fakeNext = jest.fn();
    authMiddleware(fakeRequest, fakeResponse, fakeNext);
    expect(fakeNext).toHaveBeenCalled();
  });

  it('should return UNAUTHORIZED if there is a problem on the token verification', () => {
    const fakeRequest = {
      headers: {
        'x-access-token': 'invalid-token',
      }
    };
    const sendMock = jest.fn();
    const fakeResponse = {
      status: jest.fn(() => ({
        send: sendMock,
      })),
    };
    const fakeNext = jest.fn();
    authMiddleware(fakeRequest, fakeResponse as object, fakeNext);
    expect(fakeResponse.status).toHaveBeenCalledWith(401);
    expect(sendMock).toHaveBeenCalledWith({
      code: 401,
      error: 'jwt malformed',
    });
  });

  it('should return UNAUTHORIZED middleware if there is no token', () => {
    const fakeRequest = {
      headers: {}
    };
    const sendMock = jest.fn();
    const fakeResponse = {
      status: jest.fn(() => ({
        send: sendMock,
      })),
    };
    const fakeNext = jest.fn();
    authMiddleware(fakeRequest, fakeResponse as object, fakeNext);
    expect(fakeResponse.status).toHaveBeenCalledWith(401);
    expect(sendMock).toHaveBeenCalledWith({
      code: 401,
      error: 'jwt must be provided',
    });
  });
});