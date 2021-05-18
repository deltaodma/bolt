import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class userRoleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  @ApiProperty({
    description: 'user id',
    maximum: 36,
  })
  user_id: string;

  @IsString()
  @MaxLength(36)
  @ApiProperty({
    description: 'rol id',
    maximum: 36,
  })
  rol_id: string;
}
