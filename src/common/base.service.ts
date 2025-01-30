import { BaseRepository } from './base.repository';
import { ResData } from 'src/lib/resData';
import { HttpException, HttpStatus } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

export abstract class BaseService<Entity, CreateDto, UpdateDto> {
  constructor(
    private readonly repository: BaseRepository<Entity, CreateDto>,
    private readonly entityName: string,
  ) {}
  async create(dto: CreateDto): Promise<ResData<Entity>> {
    const data = await this.repository.create(dto);
    const resData = new ResData<Entity>(
      HttpStatus.CREATED,
      'Created Successfully',
      data,
    );
    return resData;
  }

  async findAll(): Promise<ResData<Array<Entity>>> {
    const data = await this.repository.findAll();
    const resData = new ResData<Array<Entity>>(HttpStatus.OK, 'Success', data);
    return resData;
  }

  async findOne(id: number): Promise<ResData<Entity>> {
    const data = await this.repository.findOne(id);
    if (!data) {
      throw new HttpException(
        `${this.entityName} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const resData = new ResData<Entity>(
      HttpStatus.OK,
      `${this.entityName} found successfully`,
      data,
    );

    return resData;
  }

  async update(id: number, dto: UpdateDto): Promise<ResData<Entity>> {
    const foundData = await this.repository.findOne(id);
    const updateDto = Object.assign(foundData, dto);
    const data = await this.repository.update(updateDto);
    const resData = new ResData<Entity>(
      HttpStatus.OK,
      `${this.entityName} updated successfully`,
      data,
    );
    return resData;
  }

  async remove(id: number): Promise<ResData<Entity>> {
    const foundData = await this.repository.findOne(id);
    const data = await this.repository.remove(foundData);
    const resData = new ResData<Entity>(
      HttpStatus.OK,
      `${this.entityName} removed successfully`,
      data,
    );
    return resData;
  }
  async delete(id: number): Promise<DeleteResult> {
    await this.repository.findOne(id);
    return await this.repository.delete(id);
  }
}
