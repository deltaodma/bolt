import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class favoriteDto {
  @IsString()
  @MaxLength(36)
  @ApiProperty({
    description: 'app id',
    maximum: 36,
  })
  app_id: string;

  @IsString()
  @MaxLength(36)
  @ApiProperty({
    description: 'user id',
    maximum: 36,
  })
  user_id: string;
}
