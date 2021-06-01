import { ProjectsService } from './../projects/services/projects.service';
import { AuthService } from './services/auth.service';
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
  Redirect,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { authDto } from './dto/auth.dto';
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
import { ConfigSaml } from './../user/controllers/config';
const fs = require('fs');
import * as dotenv from 'dotenv';
const globalVars = dotenv.config();
import { LocalAuthGuard } from './local-auth.guard';
import { Profile, VerifiedCallback } from 'passport-saml';
import { stringify } from 'querystring';
const SAML = require('saml-encoder-decoder-js');
var parseString = require('xml2js').parseString;
const Saml2js = require('saml2js');

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  public config: ConfigSaml;
  public userData: any;
  constructor(
    private _AuthService: AuthService,
    private _Saml2Strategy: Saml2Strategy,
    private _projectService: ProjectsService,
  ) {
    this.config = new ConfigSaml();
  }
  @Get('saml')
  @UseGuards(AuthGuard('saml'))
  samlLogin() {
    console.log(process.env.API_URL);
    console.log(this._Saml2Strategy);

    // initiates the Google OAuth2 login flow
    /*passport.authenticate('saml', {
      successRedirect: '/',
      failureRedirect: '/login',
    });*/
  }

  @Get('example')
  example() {
    console.log(process.env.API_URL + 'auth/callback');
  }

  @Get('loginsaml')
  @Redirect(process.env.URL_SERVICIO)
  loginSaml() {
    console.log(process.env.URL_SERVICIO);
  }

  //@UseGuards(AuthGuard('local'))

  //@UseGuards(LocalAuthGuard)
  @Post('register')
  registerUser(@Body() _authDto: authDto) {
    console.log('entra');
    return this._AuthService.create(_authDto);
  }
  //@UseGuards(LocalAuthGuard)
  async addProjects() {
    const search = '';
    const limit = 10;
    const page = 1;
    const projectList = await this._projectService.menu({
      limit: Number(limit),
      page: Number(page),
      search: String(search),
      route:
        search != ''
          ? process.env.API_URL + 'projects?search=' + search
          : process.env.API_URL + 'projects',
    });
    return projectList;
  }

  @Post('login')
  async login(@Body() body: any) {
    const user = await this._AuthService.getUserByEmail(body.email);
    if (user) {
      let token = await this._AuthService.generateToken(user);
      token['projects'] = await this.addProjects();
      return { status: 200, msg: 'token ha sido generado', token: token };
    } else {
      return { status: 201, msg: 'token no ha sido generado' };
    }
  }

  async verifyUser(userSave: authDto) {
    const user = await this._AuthService.getUserByEmail(userSave.id);

    if (user) {
      const token = await this._AuthService.generateToken(user);
      token['projects'] = await this.addProjects();
      console.log('existe usuario');
      return token;
    } else {
      const userCreate = await this._AuthService.createFromSaml(userSave);
      userCreate['projects'] = await this.addProjects();
      return userCreate;
    }
  }

  async decodeXMl(token) {
    await SAML.decodeSamlPost(token, function (err, xml) {
      if (err) {
        throw new Error(err);
      }
      return xml;
    });
  }

  @Post('/callback')
  async callback(@Request() req, @Body() body: any, @Res() res: any) {
    //console.log('el req user ', req.user);
    //console.log(req.profile);
    //console.log(body.SAMLResponse);
    /*const Xmlparse = await this.decodeXMl(body.SAMLResponse);
    console.log('el parsero ', Xmlparse);

    const propiedades = await parseString(Xmlparse, function (err, result) {
      console.log('inside function');
      console.log(result);
    }); */

    var parser = await new Saml2js(body.SAMLResponse);
    //console.log('resultado parser');
    //console.log(parser);
    const dataUser: authDto = {
      id: parser.parsedSaml.httpSchemasXmlsoapOrgWs200505IdentityClaimsName,
      firstName:
        parser.parsedSaml.httpSchemasXmlsoapOrgWs200505IdentityClaimsGivenname,
      lastName:
        parser.parsedSaml.httpSchemasXmlsoapOrgWs200505IdentityClaimsSurname,
      displayName:
        parser.parsedSaml.httpSchemasMicrosoftComIdentityClaimsDisplayname,
    };

    const signOn = await this.verifyUser(dataUser);
    //console.log('signnon', signOn);

    res.redirect(
      process.env.SAML_RETURN_ANGULAR +
        '?SamlReq=' +
        Buffer.from(JSON.stringify(signOn)).toString('base64'),
    );
  }
}
