import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class submenuUpdateDto {
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
  @MaxLength(36)
  @ApiProperty({
    description: 'updated by',
    maximum: 36,
  })
  updated_by?: string;
}
