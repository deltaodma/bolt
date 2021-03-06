import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class userDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({
    description: 'email',
    maximum: 250,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    description: 'name',
    maximum: 100,
  })
  name: string;

  @IsString()
  @MaxLength(100)
  @ApiProperty({
    description: 'last name',
    maximum: 100,
  })
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  @ApiProperty({
    description: 'country',
    maximum: 45,
  })
  country: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  @ApiProperty({
    description: 'Employee code',
    maximum: 45,
  })
  employee_code: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'status',
  })
  status: number;
}
