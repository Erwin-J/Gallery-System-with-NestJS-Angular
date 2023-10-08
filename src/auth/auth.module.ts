import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationController } from './auth.controller';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './jwt.strategy';

dotenv.config();

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '4h',
      },
    }),
  ],
  providers: [JwtStrategy, AuthService, JwtAuthGuard],
  controllers: [AuthenticationController],
})
export class AuthModule {}
