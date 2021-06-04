import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class authDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({
    description: 'email id ',
    maximum: 250,
  })
  id: string;

  @IsString()
  @MaxLength(100)
  @ApiProperty({
    description: 'Display name',
    maximum: 100,
  })
  displayName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    description: 'firstName',
    maximum: 100,
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    description: 'lastName',
    maximum: 100,
  })
  lastName: string;

  @ApiProperty({
    description: 'created by',
    maximum: 36,
  })
  created_by?: string;

  @ApiProperty({
    description: 'created by',
    maximum: 36,
  })
  updated_by?: string;

  @ApiProperty({
    description: 'created at',
  })
  created_at?: Date | string;
}
