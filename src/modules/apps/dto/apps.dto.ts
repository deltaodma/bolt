import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class appsDto {
  @IsString()
  @MaxLength(36)
  @ApiProperty({
    description: 'id tipo aplicacion',
    maximum: 36,
  })
  type_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({
    description: 'url',
    maximum: 250,
  })
  url: string;

  @ApiProperty({
    description: 'username de la app',
    maximum: 50,
  })
  username?: string;

  @ApiProperty({
    description: 'password de la app',
    maximum: 45,
  })
  password?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({
    description: 'nombre es',
    maximum: 250,
  })
  name_es: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({
    description: 'nombre en',
    maximum: 250,
  })
  name_en: string;

  @IsString()
  @MaxLength(36)
  @ApiProperty({
    description: 'submenu id',
    maximum: 36,
  })
  submenu_id: string;

  @IsOptional()
  @ApiProperty({
    description: 'creado por',
    maximum: 36,
  })
  created_by?: string;

  @IsOptional()
  @ApiProperty({
    description: 'actualizado por',
    maximum: 36,
  })
  updated_by?: string;

  @ApiProperty({
    description: 'status',
  })
  status?: number;

  @ApiProperty({
    description: 'creado',
  })
  created_at?: Date | string;

  @ApiProperty({
    description: 'actualizado',
  })
  updated_at?: Date | string;
}
