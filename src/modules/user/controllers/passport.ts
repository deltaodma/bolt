const SamlStrategy = require('passport-saml').Strategy;
module.exports = function (passport, config) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(
    new SamlStrategy(config.passport.saml, function (profile, done) {
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
    }),
  );
};
/*
import * as dotenv from 'dotenv';
const globalVars = dotenv.config();
export class ConfigPassport {

}*/
