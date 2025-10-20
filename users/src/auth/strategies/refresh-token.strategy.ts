import { ExtractJwt, Strategy } from "passport-jwt";

import { JwtPayload, JwtUser } from "@nauijohn/docker_microservices_common";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

export type JwtRefreshUser = JwtUser & {
  tokenId: string;
};

type JwtRefreshPayload = JwtPayload & {
  tokenId: string;
};

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow("JWT_REFRESH_TOKEN_SECRET"),
      passReqToCallback: false,
    });
  }

  validate(payload: JwtRefreshPayload): JwtRefreshUser {
    if (!payload) throw new UnauthorizedException();
    return { id: payload.sub, email: payload.email, tokenId: payload.tokenId };
  }
}
