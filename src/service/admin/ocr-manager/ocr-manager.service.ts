import { OCR, OCRDocument } from '@/db/schema/ocr-data';
import { GetOCRDto, IdOCRDto } from '@/dto';
import { Logger } from '@/lib/utils/log4js';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OcrManagerService {
  constructor(
    @InjectModel(OCR.name) private readonly ocrSchema: Model<OCRDocument>,
  ) {}

  async get({ page, limit }: GetOCRDto) {
    try {
      return await this.ocrSchema
        .find()
        .skip((page - 1) * limit)
        .limit(limit);
    } catch (e) {
      Logger.error(e);
      return null;
    }
  }

  async getOne({ _id }: IdOCRDto) {
    try {
      const res = await this.ocrSchema.findById(_id);
      return JSON.parse(res.data);
    } catch (e) {
      Logger.error(e);
      return null;
    }
  }

  async remove({ _id }: IdOCRDto) {
    try {
      await this.ocrSchema.findByIdAndRemove(_id);
      return '删除成功';
    } catch (e) {
      Logger.error(e);
      return null;
    }
  }
}
