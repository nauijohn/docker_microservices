import type { Request } from "express";

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UnprocessableEntityException,
  UseGuards,
} from "@nestjs/common";

import { RefreshTokensService } from "../refresh-tokens/refresh-tokens.service";
import { User, UsersService } from "../users";
import { AuthService } from "./auth.service";
import { BearerToken } from "./decorators/bearer-token.decorator";
import { ReqUser } from "./decorators/req-user.decorator";
import { SignUpDto } from "./dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RefreshTokenGuard } from "./guards/refresh-token.guard";
import { hash } from "./utils/security";

import type { JwtRefreshUser } from "./strategies/refresh-token.strategy";
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly refreshTokensService: RefreshTokensService,
  ) {}

  @Post("sign-up")
  async signUp(@Body() request: SignUpDto) {
    let user = await this.usersService.findByEmail(request.email);
    if (user) throw new UnprocessableEntityException("User already exists");

    const hashedPassword = await hash(request.password);

    user = await this.usersService.create({
      ...request,
      password: hashedPassword,
    });
    if (!user) throw new InternalServerErrorException("Error creating user");

    const tokens = this.authService.createTokens(user);

    const hashedRefreshToken = await hash(tokens.refreshToken);

    const refreshToken = await this.refreshTokensService.create({
      user,
      token: hashedRefreshToken,
    });
    if (!refreshToken)
      throw new InternalServerErrorException("Error creating refreshToken");

    return tokens;
  }

  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async signIn(@ReqUser() user: User) {
    let { refreshToken } = user;
    const tokens = this.authService.createTokens(user);

    const hashedRefreshToken = await hash(tokens.refreshToken);

    if (!refreshToken) {
      refreshToken = await this.refreshTokensService.create({
        token: hashedRefreshToken,
        user,
      });
    } else {
      refreshToken = await this.refreshTokensService.update({
        id: refreshToken.id,
        token: hashedRefreshToken,
      });
    }

    if (!refreshToken) throw new InternalServerErrorException();

    return tokens;
  }

  @Post("sign-out")
  @UseGuards(RefreshTokenGuard)
  async signOut(@ReqUser() user: JwtRefreshUser) {
    if (user.tokenId) {
      await this.refreshTokensService.delete(user.tokenId);
    }
  }

  @Post("refresh-token")
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  async refreshToken(
    @ReqUser() reqUser: JwtRefreshUser,
    @BearerToken() bearerToken: string,
  ) {
    const tokens = await this.authService.refreshTokens(
      reqUser.id,
      bearerToken,
    );
    if (!tokens) throw new InternalServerErrorException("Invalid Token");

    return tokens;
  }
}
