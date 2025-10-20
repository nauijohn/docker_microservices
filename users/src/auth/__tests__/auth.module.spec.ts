import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";
// src/auth/__tests__/auth.module.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { RefreshToken } from "../../refresh-tokens";
import { User } from "../../users";
import { AuthModule } from "../auth.module";

describe("AuthModule", () => {
  let configService: ConfigService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue({})
      .overrideProvider(getRepositoryToken(RefreshToken))
      .useValue({})
      .compile();

    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return correct JWT config from factory", () => {
    const jwtConfig: JwtModuleOptions = {
      secret: configService.get("JWT_SECRET"),
      signOptions: {
        expiresIn: configService.get("JWT_EXPIRES_IN"),
      },
    };

    expect(jwtConfig).toEqual({
      secret: expect.any(String),
      signOptions: {
        expiresIn: expect.any(String),
      },
    });
  });
});
