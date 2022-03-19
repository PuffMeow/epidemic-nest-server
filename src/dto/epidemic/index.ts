import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OcrDto {
  @IsNotEmpty()
  @ApiProperty({ description: '图片' })
  image: string;
}

export class TrackDetailDto {
  @IsNotEmpty()
  @ApiProperty({ description: '经纬度' })
  poi: string;
  @IsNotEmpty()
  @ApiProperty({ description: '城市代码' })
  cityCode: number;
  @IsNotEmpty()
  @ApiProperty({ description: '城市名称' })
  cityName: string;
}

export class RecognitionDto {
  @IsNotEmpty()
  @ApiProperty({ description: '图片url' })
  img: string;
}

export class ViewCounterDTO {
  @ApiProperty({ description: '疫情数据页访问量' })
  @ApiPropertyOptional({ enum: ['epidemic', 'track', 'overseas'] })
  type: string;
}
