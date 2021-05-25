import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class typesDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  @ApiProperty({
    description: 'name english',
    maximum: 45,
  })
  name_en: string;

  @IsString()
  @MaxLength(45)
  @ApiProperty({
    description: 'nombre es',
    maximum: 45,
  })
  name_es: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  @ApiProperty({
    description: 'icono',
    maximum: 45,
  })
  icon: string;
}
