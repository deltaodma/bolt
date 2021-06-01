import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class submenusItem {
  @IsNotEmpty()
  @ApiProperty({
    description: 'acceso',
    required: true,
  })
  access: number;
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  @ApiProperty({
    description: 'project id',
    maximum: 36,
    required: true,
  })
  projects_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  @ApiProperty({
    description: 'submenu id',
    maximum: 36,
    required: true,
  })
  submenu_id: string;
}
export class appItem {
  @IsNotEmpty()
  @ApiProperty({
    description: 'acceso',
    required: true,
  })
  access: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  @ApiProperty({
    description: 'app id',
    maximum: 36,
    required: true,
  })
  app_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  @ApiProperty({
    description: 'submenu id',
    maximum: 36,
    required: true,
  })
  submenu_id: string;
}

export class projectRolSubmenuDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'status',
    required: true,
  })
  status?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  @ApiProperty({
    description: 'created by',
    maximum: 36,
    required: true,
  })
  created_by?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  @ApiProperty({
    description: 'name es',
    maximum: 45,
    required: true,
  })
  name_es?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  @ApiProperty({
    description: 'name en',
    maximum: 45,
    required: true,
  })
  name_en?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({
    description: 'description es',
    maximum: 250,
    required: true,
  })
  description_es?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({
    description: 'description en',
    maximum: 250,
    required: true,
  })
  description_en?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({
    description: 'array de proyectos',
  })
  projects: [];

  @IsNotEmpty()
  @ArrayMinSize(1)
  @ApiProperty({
    description: 'array de submenus',
    type: [submenusItem],
  })
  submenus: submenusItem[];

  @IsNotEmpty()
  @ArrayMinSize(1)
  @ApiProperty({
    description: 'array de apps',
    type: [appItem],
  })
  apps: appItem[];

  submenuRoles: [];
}
