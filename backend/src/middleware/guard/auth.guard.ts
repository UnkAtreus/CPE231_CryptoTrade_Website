import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    const role = this.reflector.get<string>('roles', context.getHandler());
    console.log(role);

    if (!role) {
      return true;
    } else {
      if (!ctx.headers.authorization) {
        throw new UnauthorizedException();
      }
      ctx.user = await this.validateToken(ctx.headers.authorization);

      return ctx.user['roleName'] === role;
    }
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const token = auth.split(' ')[1];
    try {
      return await jwt.verify(token, 'secret');
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
