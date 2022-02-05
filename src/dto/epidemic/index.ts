import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OcrDto {
  @IsNotEmpty()
  @ApiProperty({ description: '图片' })
  image: string;
}
