//@ts-nocheck
import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE_DB } from './database.module';
import { eq } from 'drizzle-orm';
import { AnyPgTable } from 'drizzle-orm/pg-core';

@Injectable()
export abstract class AbstractRepository<T extends Record<string, any>> {
  constructor(
    @Inject(DRIZZLE_DB)
    protected readonly db: NodePgDatabase,
    protected readonly dbTable: AnyPgTable, // Use Drizzle's PgTable type
  ) {}

  async findAll(): Promise<T[]> {
    return this.db.select().from(this.dbTable).execute() as Promise<T[]>;
  }

  async findOne(id: string): Promise<T | null> {
    const result = await this.db
      .select()
      .from(this.dbTable)
      .where(eq(this.dbTable.id, id)) // Assuming `id` is a column in your table
      .execute();

    return (result[0] as T) || null;
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    const result = await this.db
      .insert(this.dbTable)
      .values(data)
      .returning()
      .execute();

    return result[0] as T;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const result = await this.db
      .update(this.dbTable)
      .set(data)
      .where(eq(this.dbTable.id, id))
      .returning()
      .execute();

    return result[0] as T;
  }

  async delete(id: string): Promise<T> {
    const result = await this.db
      .delete(this.dbTable)
      .where(eq(this.dbTable.id, id))
      .returning()
      .execute();

    return result[0] as T;
  }
}
