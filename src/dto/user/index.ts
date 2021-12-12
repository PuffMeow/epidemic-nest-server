import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  readonly username: string;
  @ApiProperty({ description: '密码' })
  readonly password: string;
  @ApiPropertyOptional({ description: '邮箱' })
  readonly email?: string;
  @ApiPropertyOptional({ description: '手机' })
  readonly phone?: string;
}
