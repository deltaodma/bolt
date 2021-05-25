import { AuthController } from './auth.controller';
import { Saml2Strategy } from './strategies/saml.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, Saml2Strategy],
})
export class AuthModule {}
