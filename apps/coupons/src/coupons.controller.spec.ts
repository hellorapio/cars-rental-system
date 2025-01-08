import { Test, TestingModule } from '@nestjs/testing';
import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';

describe('CouponsController', () => {
  let couponsController: CouponsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CouponsController],
      providers: [CouponsService],
    }).compile();

    couponsController = app.get<CouponsController>(CouponsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(couponsController.getHello()).toBe('Hello World!');
    });
  });
});
