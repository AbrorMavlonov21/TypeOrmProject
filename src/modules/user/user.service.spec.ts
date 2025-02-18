import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ResData } from 'src/lib/resData';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'IUserRepository',
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            getByLogin: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>('IUserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getByLogin', () => {
    it('should return a user by login', async () => {
      const mockUser = { id: 1, login: 'testuser' } as UserEntity;
      jest.spyOn(userRepository, 'getByLogin').mockResolvedValue(mockUser);

      const result = await service.getByLogin('testuser');
      expect(result).toEqual(
        new ResData(200, 'User found successfully', mockUser),
      );
      expect(userRepository.getByLogin).toHaveBeenCalledWith('testuser');
    });

    it('should return a 404 error if user is not found', async () => {
      jest.spyOn(userRepository, 'getByLogin').mockResolvedValue(null);

      const result = await service.getByLogin('nonexistent');
      expect(result.meta.statusCode).toEqual(404);
      expect(result.meta.message).toEqual('User not found by Login');
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto = {
        login: 'testuser',
        password: 'password',
      } as CreateUserDto;
      const mockUser = { id: 1, ...createUserDto } as UserEntity;
      jest.spyOn(userRepository, 'create').mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);
      expect(result).toEqual(
        new ResData(HttpStatus.CREATED, 'Created Successfully', mockUser),
      );
      expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const mockUsers = [{ id: 1, login: 'testuser' }] as UserEntity[];
      jest.spyOn(userRepository, 'findAll').mockResolvedValue(mockUsers);

      const result = await service.findAll();
      expect(result).toEqual(new ResData(HttpStatus.OK, 'Success', mockUsers));
      expect(userRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const mockUser = { id: 1, login: 'testuser' } as UserEntity;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

      const result = await service.findOne(1);
      expect(result).toEqual(
        new ResData(HttpStatus.OK, 'User found successfully', mockUser),
      );
      expect(userRepository.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw a 404 error if user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = {
        login: 'updateduser',
        password: 'newpassword',
      } as UpdateUserDto;
      const mockUser = {
        id: 1,
        login: 'testuser',
        password: 'password',
      } as UserEntity;
      const updatedUser = { ...mockUser, ...updateUserDto };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(userRepository, 'update').mockResolvedValue(updatedUser);

      const result = await service.update(1, updateUserDto);
      expect(result).toEqual(
        new ResData(HttpStatus.OK, 'User updated successfully', updatedUser),
      );
      expect(userRepository.findOne).toHaveBeenCalledWith(1);
      expect(userRepository.update).toHaveBeenCalledWith(updatedUser);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const mockUser = { id: 1, login: 'testuser' } as UserEntity;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(userRepository, 'remove').mockResolvedValue(mockUser);

      const result = await service.remove(1);
      expect(result).toEqual(
        new ResData(HttpStatus.OK, 'User removed successfully', mockUser),
      );
      expect(userRepository.findOne).toHaveBeenCalledWith(1);
      expect(userRepository.remove).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const mockUser = { id: 1, login: 'testuser' } as UserEntity;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      jest
        .spyOn(userRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as DeleteResult);

      const result = await service.delete(1);
      expect(result).toEqual({ affected: 1 });
      expect(userRepository.findOne).toHaveBeenCalledWith(1);
      expect(userRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
