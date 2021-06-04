import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class appRolDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  @ApiProperty({
    description: 'app id',
    maximum: 36,
  })
  app_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  @ApiProperty({
    description: 'id fk rolessubmenus.id',
    maximum: 36,
  })
  submenu_rol_id: string;
}
