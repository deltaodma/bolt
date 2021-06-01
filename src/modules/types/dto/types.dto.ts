import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class typesDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  @ApiProperty({
    description: 'name',
    maximum: 45,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  @ApiProperty({
    description: 'icono',
    maximum: 45,
  })
  icon: string;
}
