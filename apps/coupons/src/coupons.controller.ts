import { Controller, Get } from '@nestjs/common';
import { CouponsService } from './coupons.service';

@Controller()
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get()
  getHello(): string {
    return this.couponsService.getHello();
  }
}
