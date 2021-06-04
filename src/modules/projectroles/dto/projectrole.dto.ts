import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { projectsDto } from './../../projects/dto/projects.dto';

export class projectroleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  @ApiProperty({
    description: 'id rol',
    maximum: 36,
  })
  rol_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  @ApiProperty({
    description: ' id proyecto',
    maximum: 36,
  })
  project_id: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'acceso',
    required: true,
  })
  access: number;

  //project: { id: string };
}
