import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class bannersDto {
  @ApiProperty({
    description: 'imagen data',
    maximum: 45,
  })
  image?: string;

  @IsString()
  @MaxLength(250)
  @ApiProperty({
    description: 'url redireccion',
    maximum: 250,
  })
  url_redirect: string;

  @ApiProperty({
    description: 'pdf',
    maximum: 45,
  })
  pdf?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    description: 'botton en español',
    maximum: 100,
  })
  name_es: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    description: 'boton en ingles',
    maximum: 100,
  })
  name_en: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    description: 'botton en español',
    maximum: 100,
  })
  button_es: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    description: 'boton en ingles',
    maximum: 100,
  })
  button_en: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({
    description: 'contenido en español',
    maximum: 250,
  })
  content_es: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({
    description: 'contenido en ingles',
    maximum: 250,
  })
  content_en: string;

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
