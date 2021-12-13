import { Role } from '@/types/role';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ description: '用户名' })
  readonly username: string;

  @IsNotEmpty()
  @ApiProperty({ description: '密码' })
  readonly password: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: '用户角色', default: Role.User })
  readonly role: number;

  @ApiPropertyOptional({ description: '邮箱' })
  readonly email?: string;

  @ApiPropertyOptional({ description: '手机' })
  readonly phone?: string;
}
