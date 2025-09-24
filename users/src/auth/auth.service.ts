import * as bcrypt from "bcrypt";

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { User, UsersService } from "../users";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return;

    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  login(user: User) {
    console.log("Logging in user:", user);
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
