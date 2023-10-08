import { User } from "./models/user";
import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ConfigService } from "@nestjs/config";
import { Token } from "./models/token";
import { AuthGuard } from "@nestjs/passport";

@Controller("api/authentication")
export class AuthenticationController {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("isAuthenticated")
  isAuthenticated(): boolean {
    return true;
  }

  @Post("token")
  async token(@Body() user: User): Promise<Token> {
    if (
      this.configService.get<string>("HTTP_BASIC_USER") === user.username &&
      this.configService.get<string>("HTTP_BASIC_PASS") === user.password
    ) {
      return await this.authService.login(user);
    }
    throw new UnauthorizedException();
  }
}
