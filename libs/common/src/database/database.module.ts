import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '../config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { ConfigService } from '@nestjs/config';

export const DRIZZLE_DB = 'DRIZZLE_DB';

@Global()
@Module({
  imports: [ConfigModule],
})
export class DatabaseModule {
  static async forRootAsync(dbName: string): Promise<DynamicModule> {
    const drizzleProvider = {
      provide: DRIZZLE_DB,
      useFactory: async (config: ConfigService): Promise<NodePgDatabase> => {
        try {
          const db = drizzle(config.get<string>('PG_URI') + '/' + dbName);
          return db;
        } catch (error) {
          console.error('Failed to connect to the database:', error);
          throw error;
        }
      },
      inject: [ConfigService],
    };

    return {
      module: DatabaseModule,
      providers: [drizzleProvider],
      exports: [drizzleProvider],
    };
  }
}
