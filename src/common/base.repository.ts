import { DeleteResult, Repository } from 'typeorm';

export abstract class BaseRepository<Entity, CreateDto> {
  constructor(private readonly repository: Repository<Entity>) {}
  async create(dto: CreateDto): Promise<Entity> {
    let data = this.repository.create();
    data = Object.assign(data, dto);
    const resData = await this.repository.save<Entity>(data);
    return resData;
  }
  async findAll(): Promise<Array<Entity>> {
    return await this.repository.find();
  }
  async update(entity: Entity): Promise<Entity> {
    return await this.repository.save(entity);
  }
  async findOne(id: number): Promise<Entity> {
    return await this.repository.findOne({ where: { id } as any });
  }
  async remove(entity: Entity): Promise<Entity> {
    return await this.repository.remove(entity);
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
