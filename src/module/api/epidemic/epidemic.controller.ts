import { Controller, Get } from '@nestjs/common';

@Controller('epidemic')
export class EpidemicController {
  @Get('/')
  index() {
    return 'hello';
  }
}
