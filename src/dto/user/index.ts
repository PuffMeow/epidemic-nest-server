import { Role } from '@/types/role';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, minLength } from 'class-validator';

export class CreateOrUpdateUserDto {
  @IsNotEmpty()
  @ApiProperty({ description: '用户名' })
  readonly username: string;

  @ApiProperty({ description: '密码', minLength: 6 })
  readonly password?: string;

  @ApiProperty({ description: '新密码', minLength: 6 })
  readonly newPassword?: string;

  @ApiProperty({ description: '_id' })
  readonly _id?: string;

  @ApiProperty({ description: '用户角色', default: Role.User })
  readonly role?: number;

  @ApiPropertyOptional({ description: '邮箱' })
  readonly email?: string;

  @ApiPropertyOptional({ description: '手机' })
  readonly phone?: string;
}

export class RemoveUserto {
  @IsNotEmpty()
  @ApiProperty({ description: '用户名' })
  readonly username: string;
}
