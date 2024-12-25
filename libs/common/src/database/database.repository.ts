import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export abstract class AbstractRepository<T, Delegate extends Prisma.PrismaDelegate<any>> {
  constructor(protected readonly prismaDelegate: Delegate) {}

  async findAll(): Promise<T[]> {
    return this.prismaDelegate.findMany() as Promise<T[]>;
  }

  async findOne(id: string): Promise<T | null> {
    return this.prismaDelegate.findUnique({
      where: { id },
    }) as Promise<T | null>;
  }

  async create(data: Prisma.InputJsonValue): Promise<T> {
    return this.prismaDelegate.create({
      data,
    }) as Promise<T>;
  }

  async update(id: string, data: Prisma.InputJsonValue): Promise<T> {
    return this.prismaDelegate.update({
      where: { id },
      data,
    }) as Promise<T>;
  }

  async delete(id: string): Promise<T> {
    return this.prismaDelegate.delete({
      where: { id },
    }) as Promise<T>;
  }
}
