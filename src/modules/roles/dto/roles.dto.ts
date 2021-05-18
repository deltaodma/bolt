import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class rolesDto {
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
}