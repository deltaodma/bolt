import { appRolDto } from './../../../global/dto/approl.dto';
import { roleSubmenuDto } from './../dto/rolesubmenu.dto';
import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  Request,
} from '@nestjs/common';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { get } from 'http';
import { getManager } from 'typeorm';
import { projectroleDto } from './../dto/projectrole.dto';

import { ProjectRoleService } from './../services/projectroles.service';
//import { LanguageService } from './../../global/services/language.service';
import { rolesDto } from './../../roles/dto/roles.dto';
import { projectRolSubmenuDto } from './../dto/projectrolesubmenu.dto';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
const globalVars = dotenv.config();
const passport = require('passport');
import { dateCreate } from './../../../util/dateCreate';

@ApiTags('Projectroles')
@Controller('projectRoles')
@ApiBearerAuth('JWT')
export class ProjectRoleController {
  private rolSave: string; /*codigo del rol que se guardo*/
  private projectsSave: [];
  constructor(
    private _ProjectRoleService: ProjectRoleService, //private _LanguageService: LanguageService,
  ) {}

  @Get()
  @HttpCode(200)
  getAll(@Req() request: Request) {
    console.log(request['query']['search']);
    let { page, limit, search } = request['query'];
    search == undefined ? (search = '') : request['query']['search'];
    limit == undefined ? (limit = 10) : request['query']['limit'];
    page == undefined ? (page = 1) : request['query']['page'];
    let options = {
      limit: Number(limit),
      page: Number(page),
      search: String(search),
      route:
        search != ''
          ? process.env.API_URL + 'user?search=' + search
          : process.env.API_URL + 'user',
    };
    return this._ProjectRoleService.findAll(options);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this._ProjectRoleService.findOne(id);
  }

  //@UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() _submenuDto: projectroleDto) {
    return this._ProjectRoleService.create(_submenuDto);
  }

  @Get('rolsubmenu/:id')
  getOneProjectRol(@Param('id') id: string) {
    return this._ProjectRoleService.findOneRolSubmenu(id);
  }

  @Post('createrolprojapps')
  async createProjectRole(@Body() _submenuDto: projectRolSubmenuDto) {
    /*let createSubmenuRole = await this._ProjectRoleService.createSubmenuRole({
      projectrol_id: '6b2df5a9-d83c-44c2-aa19-75f3dccb0f5a',
      submenu_id: '9cfcfe55-9862-41c3-90b3-3b8e09e7534a',
      access: 1,
    });
    return createSubmenuRole;*/

    let dateTimeNow = new dateCreate().sysdate;
    let rol = {
      name_en: _submenuDto.name_en,
      name_es: _submenuDto.name_en,
      description_en: _submenuDto.description_en,
      description_es: _submenuDto.description_es,
      status: _submenuDto.status,
      created_at: dateTimeNow,
    };
    const rolGuardar = await this._ProjectRoleService.createRol(rol);
    if (
      rolGuardar['id'] != '' &&
      rolGuardar['id'] != null &&
      rolGuardar['id'] != undefined
    ) {
      this.rolSave = rolGuardar['id'];
      for (let i = 0; i < _submenuDto.projects.length; i++) {
        //console.log('intenttos de guardar variable i ', i);
        let projectroleGuardar: projectroleDto = {
          rol_id: rolGuardar['id'],
          project_id: _submenuDto.projects[i],
          //project: { id: _submenuDto.projects[i] },
          access: 1,
        };
        /*console.log(
          'project role objeto antes de guardar ',
          projectroleGuardar,
        ); */
        if (projectroleGuardar.project_id != '') {
          console.log('antes de ', i);
          let createProjectRole = await this._ProjectRoleService.create(
            projectroleGuardar,
          );

          if (
            createProjectRole['id'] != '' &&
            createProjectRole['id'] != null &&
            createProjectRole['id'] != undefined
          ) {
            let submenus = await _submenuDto.submenus.filter((items) => {
              return items.projects_id == createProjectRole.project_id;
            });
            console.log('los submenus ', submenus);
            for (let j = 0; j < submenus.length; j++) {
              let submenuGuadar: roleSubmenuDto = {
                projectrol_id: createProjectRole['id'],
                submenu_id: submenus[j].submenu_id,
                access: 1,
              };
              console.log('submenu guardar ', submenuGuadar);
              let createSubmenuRole = await this._ProjectRoleService.createSubmenuRole(
                submenuGuadar,
              );

              if (
                createSubmenuRole['id'] != '' &&
                createSubmenuRole['id'] != null &&
                createSubmenuRole['id'] != undefined
              ) {
                let apps = await _submenuDto.apps.filter((items) => {
                  return items.submenu_id === createSubmenuRole.submenu_id;
                });

                for (let k = 0; k < apps.length; k++) {
                  let rolapp: appRolDto = {
                    app_id: apps[k].app_id,
                    submenu_rol_id: createSubmenuRole['id'],
                  };

                  let createAppRole = await this._ProjectRoleService.createAppRole(
                    rolapp,
                  );
                }
              }
            }
          }
        }
      }
    } else {
      return 'error';
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() _submenuDto: projectroleDto) {
    return this._ProjectRoleService.update(id, _submenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._ProjectRoleService.remove(id);
  }
}
