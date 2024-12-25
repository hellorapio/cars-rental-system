import { Module } from '@nestjs/common';
import { ConfigModule as NestConfig } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    NestConfig.forRoot({
      validationSchema: Joi.object({
        PG_URI: Joi.string().required(),
      }),
    }),
  ],
})
export class ConfigModule {}
