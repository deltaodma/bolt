import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class submenuDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  @ApiProperty({
    description: 'uuid',
    maximum: 36,
  })
  project_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    description: 'nombre es',
    maximum: 100,
  })
  name_es: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    description: 'nombre en',
    maximum: 100,
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

  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  @ApiProperty({
    description: 'created by',
    maximum: 36,
  })
  created_by: string;

  @ApiProperty({
    description: 'updated by',
    maximum: 36,
  })
  updated_by?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'status',
  })
  status: number;

  created_at?: Date | string;
  updated_at?: Date | string;
}
