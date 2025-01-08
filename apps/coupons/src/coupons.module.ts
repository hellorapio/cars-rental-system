import { Module } from '@nestjs/common';
import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';
import { DatabaseModule } from '@app/common';

@Module({
  imports: [DatabaseModule.forRootAsync("coupons")],
  controllers: [CouponsController],
  providers: [CouponsService],
})
export class CouponsModule {}
