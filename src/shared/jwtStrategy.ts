import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { config } from '../config/index';
import { UserService } from 'src/modules/user/user.service';
import { PassportStrategy } from '@nestjs/passport';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject('IUserService')
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: any) {
    console.log('Validating JWT payload:', payload);
    const user = await this.userService.findOne(payload.id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return { ...user, roles: user.data.roles };
  }
}
