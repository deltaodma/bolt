import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  @ApiProperty({
    description: 'nombre en',
    maximum: 45,
  })
  name_en: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({
    description: 'nombre es',
    maximum: 45,
  })
  name_es: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  @ApiProperty({
    description: 'icon',
    maximum: 45,
  })
  icono: string;
}
