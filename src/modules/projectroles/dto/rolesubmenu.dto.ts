import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class roleSubmenuDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  @ApiProperty({
    description: 'project rol id',
    maximum: 36,
    required: true,
  })
  projectrol_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  @ApiProperty({
    description: 'submenu id',
    maximum: 36,
    required: true,
  })
  submenu_id: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'acceso',
    required: true,
  })
  access: number;
}
