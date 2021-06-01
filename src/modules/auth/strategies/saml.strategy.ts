import { Injectable } from '@nestjs/common';
import { PassportStrategy, PassportSerializer } from '@nestjs/passport';
//import { passport } from 'passport';
const passport = require('passport');
var SamlStrategy = require('passport-saml').Strategy;
import { Profile, VerifiedCallback } from 'passport-saml';
const fs = require('fs');
import * as dotenv from 'dotenv';
const globalVars = dotenv.config();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

@Injectable()
export class Saml2Strategy extends PassportStrategy(SamlStrategy, 'saml') {
  public user: any;
  constructor() {
    super({
      entryPoint: process.env.SAML_ENTRY_POINT,
      issuer: process.env.SAML_ISSUER,
      callbackUrl: process.env.API_URL + 'auth/callback',
      passReqToCallback: true,
      scope: ['profile'],
      cert: fs.readFileSync(
        process.cwd() + '/src/modules/auth/strategies/certificate.pem' ||
          process.cwd() + '/src/modules/auth/strategies/certificate.pem',
        'utf-8',
      ),
      function(profile, done) {
        return done(null, {
          id: profile.nameID,
          email:
            profile[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
            ],
          displayName:
            profile['http://schemas.microsoft.com/identity/claims/displayname'],
          firstName:
            profile[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'
            ],
          lastName:
            profile[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'
            ],
        });
      },
    });
  }

  public async validate(profile?: any): Promise<any> {
    if (!profile) {
      console.log('error no hay perfil');
    } else {
      return {
        id: profile.eppn,
        firstName: profile.givenName,
        lastName: profile.sn,
        email: profile.email,
      };
    }
  }

  public async done(profile?: any): Promise<any> {
    if (!profile) {
      console.log('error no hay perfil');
    } else {
      this.user = profile;
      return {
        id: profile.eppn,
        firstName: profile.givenName,
        lastName: profile.sn,
        email: profile.email,
      };
    }
  }

  public getUser() {
    return this.user;
  }

  public findByEmail(email: string, cb: VerifiedCallback) {
    console.log('algo');
    cb(null);
  }
}
