import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';

var SamlStrategy = require('passport-saml').Strategy;

@Injectable()
export class Saml2Strategy extends PassportStrategy(Strategy) {
  constructor() {
    super({});
  }
}
