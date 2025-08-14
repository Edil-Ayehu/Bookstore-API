import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        private reflector:Reflector
    ){
        super()
    }

        canActivate(context: ExecutionContext) {
            const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
                context.getHandler(),
                context.getClass()
            ]);
    
        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if(!authHeader){
            throw new UnauthorizedException("Authorization header is missing!")
        }
    
        return super.canActivate(context);

        }

    handleRequest(err, user, info) {
    if (err || !user) {
      // Customize message for token expiration
      if (info?.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Your session has expired. Please log in again.');
      }

      // Customize message for invalid token
      if (info?.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token. Please log in again.');
      }

      throw err || new UnauthorizedException('Authentication failed.');
    }

    return user;
  }
}
