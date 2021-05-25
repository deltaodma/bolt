import { Saml2Strategy } from './strategies/saml.strategy';
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Res,
  Req,
  Request,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
import { ConfigSaml } from './../user/controllers/config';
const fs = require('fs');

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  public config: ConfigSaml;
  public userData: any;
  constructor() {
    this.config = new ConfigSaml();
  }
  @Get('saml')
  @UseGuards(AuthGuard('saml'))
  samlLogin() {
    // initiates the Google OAuth2 login flow
    /*passport.authenticate('saml', {
      successRedirect: '/',
      failureRedirect: '/login',
    });*/
  }

  @Post('/callback')
  async callback(@Request() req, @Body() body: any) {
    if (req.isAuthenticated()) {
      console.log('autenticado');
    }
    /*
    return function (req, res, next) {
      passport.authenticate(
        new SamlStrategy(
          {
            path: process.env.SAML_PATH || 'api/v1/auth/callback',
            entryPoint:
              process.env.SAML_ENTRY_POINT ||
              'https://login.microsoftonline.com/1b4c1c25-a699-4f61-95e2-45d8dec5a788/saml2',
            issuer: '' + process.env.SAML_ISSUER,
            cert: fs.readFileSync(
              process.cwd() +
                '/src/modules/user/controllers/' +
                process.env.SAML_CERT ||
                process.cwd() + '/src/modules/user/controllers/certificate.pem',
              'utf-8',
            ),
          },
          function (req, profile, done) {
            return done(null, profile);
          },
        ),
        function (err, user, info) {
          console.log('el error ', err);
          console.log('el user ', user);
          console.log('la infoi ', info);
        },
      )(req, res, next);
    };

    */

    /*console.log('requeimiento', req);
    console.log('requeimiento body', body);
    passport.serializeUser(function (user, done) {
      done(null, user);
    });

    passport.deserializeUser(function (user, done) {
      done(null, user);
    });
    passport.use(
      new SamlStrategy(
        {
          path: process.env.SAML_PATH || 'api/v1/auth/callback',
          entryPoint:
            process.env.SAML_ENTRY_POINT ||
            'https://login.microsoftonline.com/1b4c1c25-a699-4f61-95e2-45d8dec5a788/saml2',
          issuer: '' + process.env.SAML_ISSUER,
          cert: fs.readFileSync(
            process.cwd() +
              '/src/modules/user/controllers/' +
              process.env.SAML_CERT ||
              process.cwd() + '/src/modules/user/controllers/certificate.pem',
            'utf-8',
          ),
        },
        function (profile, done) {
          console.log('el profile');
          console.log('el done');
          console.log('asdf profile', profile.user);
          return done(null, {
            id: profile.nameID,
            email:
              profile[
                'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
              ],
            displayName:
              profile[
                'http://schemas.microsoft.com/identity/claims/displayname'
              ],
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
      ),
    ); */
  }
}
