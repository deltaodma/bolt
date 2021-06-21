import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class tokenDto {
  @ApiProperty({
    description: 'id ',
    maximum: 36,
  })
  id: string;

  @ApiProperty({
    description: 'email',
    maximum: 250,
  })
  email: string;

  @ApiProperty({
    description: 'name',
    maximum: 100,
  })
  name: string;

  @ApiProperty({
    description: 'last name',
    maximum: 100,
  })
  last_name: string;

  @ApiProperty({
    description: 'Country',
    maximum: 45,
  })
  country: string;

  @ApiProperty({
    description: 'employee code',
    maximum: 20,
  })
  employee_code: string | number;

  @ApiProperty({
    description: 'profile',
    maximum: 20,
  })
  profile: string;
}
