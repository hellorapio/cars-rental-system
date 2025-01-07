import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '../config';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { ConfigService } from '@nestjs/config';

export const DRIZZLE_DB = 'DRIZZLE_DB';

@Global()
@Module({
  imports: [ConfigModule],
})
export class DatabaseModule {
  static forRootAsync(dbName: string): DynamicModule {
    const drizzleProvider = {
      provide: DRIZZLE_DB,
      useFactory: async (config: ConfigService): Promise<NodePgDatabase> => {
        const pool = new Pool({
          connectionString: config.get<string>('PG_URI'),
          database: dbName,
        });

        try {
          console.log(`Connecting to database: ${dbName}...`);
          const db = drizzle(pool);
          console.log('Database connection established.');
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
