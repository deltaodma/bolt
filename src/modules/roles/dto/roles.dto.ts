import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class rolesDto {
  @IsString()
  @MaxLength(45)
  @ApiProperty({
    description: 'nombre es',
    maximum: 45,
  })
  name_es: string;

  @IsString()
  @MaxLength(45)
  @ApiProperty({
    description: 'nombre en',
    maximum: 45,
  })
  name_en: string;
  @IsString()
  @MaxLength(250)
  @ApiProperty({
    description: 'descripcion es',
    maximum: 250,
  })
  description_es: string;

  @IsString()
  @MaxLength(250)
  @ApiProperty({
    description: 'descripcion en',
    maximum: 250,
  })
  description_en: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'status',
  })
  status: number;

  @ApiProperty({
    description: 'created_at',
  })
  created_at?: Date | string;
}
