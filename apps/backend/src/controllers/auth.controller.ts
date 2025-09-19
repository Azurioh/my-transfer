import { Errors } from '@edge-trading/shared/enums/errors';
import { HttpStatusCode } from '@edge-trading/shared/enums/http-status';
import type { SignInBody, SignUpBody } from '@edge-trading/shared/types/auth.types';
import type { AuthService } from '@services/auth.service';
import { isEmailValid, isPasswordValid } from '@utils/common';
import { hashPassword } from '@utils/password';
import { generateAccessToken, generateRefreshToken } from '@utils/token';
import type { FastifyReply, FastifyRequest } from 'fastify';

/**
 * @class AuthController
 *
 * @description Auth controller class
 */
export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  /**
   * @function signUp
   * @description Sign up a new user
   *
   * @param request The request object
   * @param reply The reply object
   */
  async signUp(request: FastifyRequest<{ Body: SignUpBody }>, reply: FastifyReply) {
    if (!isEmailValid(request.body.email) || !isPasswordValid(request.body.password)) {
      return reply.error('Invalid email or password', HttpStatusCode.BAD_REQUEST, Errors.INVALID_CREDENTIALS);
    }

    const user = await this.authService.findUserByEmail(request.body.email);
    if (user) {
      return reply.error('User already exists', HttpStatusCode.CONFLICT, Errors.USER_ALREADY_EXISTS);
    }

    await this.authService.signUp({
      ...request.body,
      password: await hashPassword(request.body.password),
    });

    reply.success('User created successfully', HttpStatusCode.CREATED);
  }

  /**
   * @function signIn
   * @description Sign in a user
   *
   * @param request The request object
   * @param reply The reply object
   */
  async signIn(request: FastifyRequest<{ Body: SignInBody }>, reply: FastifyReply) {
    const user = await this.authService.signIn(request.body.email, request.body.password);

    const accessToken = generateAccessToken({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    });
    const refreshToken = generateRefreshToken({ id: user._id.toString() }, request.body.rememberMe);

    reply.success({ accessToken, refreshToken });
  }
}
