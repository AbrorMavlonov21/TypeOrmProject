import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<UserEntity>(
    err: Error | HttpException,
    user: UserEntity,
    info: Error | undefined,
  ) {
    if (err || !user) {
      console.error('Auth Guard Error:', info);
      const message = info?.message || 'Unauthorized';
      throw err || new UnauthorizedException(message || 'Unauthorized');
    }
    return user;
  }
}
