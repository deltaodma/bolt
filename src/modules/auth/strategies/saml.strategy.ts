import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passport } from 'passport';

var SamlStrategy = require('passport-saml').Strategy;
const fs = require('fs');

@Injectable()
export class Saml2Strategy extends PassportStrategy(SamlStrategy, 'saml') {
  constructor() {
    super({
      entryPoint: process.env.SAML_ENTRY_POINT,
      issuer: process.env.SAML_ISSUER,
      callbackUrl: 'http://localhost:5000/api/v1/auth/callback',
      cert: fs.readFileSync(
        process.cwd() +
          '/src/modules/auth/strategies/' +
          process.env.SAML_CERT ||
          process.cwd() + '/src/modules/auth/strategies/certificate.pem',
        'utf-8',
      ),
      function(profile, done) {
        console.log('profile in strategy', profile);
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
}
