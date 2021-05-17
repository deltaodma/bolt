import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class projectsDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  @ApiProperty({
    description: 'icono',
    maximum: 36,
  })
  image: string;

  @IsString()
  @MaxLength(250)
  @ApiProperty({
    description: 'nombre es',
    maximum: 250,
  })
  name_es: string;

  @IsString()
  @MaxLength(250)
  @ApiProperty({
    description: 'nombre en',
    maximum: 250,
  })
  name_en: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({
    description: 'descripción español',
    maximum: 250,
  })
  description_es: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({
    description: 'descripción en ingles',
    maximum: 250,
  })
  description_en: string;
}
