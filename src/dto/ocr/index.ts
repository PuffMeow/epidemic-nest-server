import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetOCRDto {
  @IsNotEmpty()
  @ApiProperty({ description: '分页页数' })
  readonly page: number;

  @IsNotEmpty()
  @ApiProperty({ description: '分页限制数量' })
  readonly limit: number;
}

export class IdOCRDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'id' })
  readonly _id: string;
}
