/*const fs = require('fs');

module.exports = {
  development: {
    app: {
      name: 'Passport SAML strategy example',
      port: process.env.PORT || 3000
    },
    passport: {
      strategy: 'saml',
      saml: {
        path: process.env.SAML_PATH || '/login/callback',
        entryPoint: process.env.SAML_ENTRY_POINT || 'https://login.microsoftonline.com/1b4c1c25-a699-4f61-95e2-45d8dec5a788/saml2',
        issuer: '5f394a39-a4ce-4239-86be-4487ac23c7d5',
        cert: fs.readFileSync(process.env.SAML_CERT || './config/certificate.pem', "utf-8")
      }
    }
  }
}; */
const fs = require('fs');
import * as dotenv from 'dotenv';
const globalVars = dotenv.config();
export class ConfigSaml {
  public passport: {};
  constructor() {
    this.passport = {
      strategy: 'saml',
      saml: {
        path: process.env.SAML_PATH || 'api/v1/auth/callback',
        entryPoint:
          process.env.SAML_ENTRY_POINT ||
          'https://login.microsoftonline.com/1b4c1c25-a699-4f61-95e2-45d8dec5a788/saml2',
        issuer: '' + process.env.SAML_ISSUER,
        cert: fs.readFileSync(
          process.cwd() + '/src/modules/user/controllers/certificate.pem' ||
            process.cwd() + '/src/modules/user/controllers/certificate.pem',
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
      },
    };
  }
  public getConfigSaml() {
    return this.passport;
  }
}
