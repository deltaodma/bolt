import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UtilJWT {
  constructor(private _jwtService: JwtService) {}

  decode(auth: string): { uuid: string } {
    const jwt = auth.replace('Bearer ', '');
    return this._jwtService.decode(jwt, { json: true }) as { uuid: string };
  }
}
