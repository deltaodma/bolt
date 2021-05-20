const fs = require('fs');

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
};
