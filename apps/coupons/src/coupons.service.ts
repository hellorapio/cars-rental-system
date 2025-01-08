import { Injectable } from '@nestjs/common';

@Injectable()
export class CouponsService {
  getHello(): string {
    return 'Hello World!';
  }
}
