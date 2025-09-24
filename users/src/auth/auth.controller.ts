import type { Request } from "express";

import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "../../../common/libs/my-library/src/jwt-auth.guard";
import { User, UsersService } from "../users";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post("sign-up")
  async signUp(@Body() request: SignUpDto) {
    const user = await this.usersService.findByEmail(request.email);
    if (user) throw new Error("User already exists");

    const hashedPassword = await this.authService.hashPassword(
      request.password,
    );

    return this.usersService.create({
      ...request,
      password: hashedPassword,
    });
  }

  @Post("sign-in")
  @UseGuards(LocalAuthGuard)
  signIn(@Req() req: Request) {
    console.log("Request user:", req.user);
    return this.authService.login(req.user as User);
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request) {
    console.log("Request user:", req.user);
    return {
      message: "User profile data",
    };
  }
}
