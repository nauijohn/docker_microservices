import type { Request } from "express";

import { JwtAuthGuard } from "@nauijohn/docker_microservices_common";
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";

import { User, UsersService } from "../users";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post("sign-up")
  async signUp(@Body() request: SignUpDto) {
    let user = await this.usersService.findByEmail(request.email);
    if (user) throw new Error("User already exists");

    const hashedPassword = await this.authService.hashPassword(
      request.password,
    );

    user = await this.usersService.create({
      ...request,
      password: hashedPassword,
    });
    if (!user) throw new InternalServerErrorException("Error creating user");

    const accessToken = this.authService.createAccessToken(user);

    return { accessToken };
  }

  @Post("sign-in")
  @UseGuards(LocalAuthGuard)
  signIn(@Req() req: Request) {
    const accessToken = this.authService.createAccessToken(req.user as User);
    return { accessToken };
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request) {
    return {
      user: req.user,
    };
  }
}
