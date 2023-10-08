import { Token } from "./models/token";
import { User } from "./models/user";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: User): Promise<Token> {
    const payload = { username: user.username, password: user.password };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
