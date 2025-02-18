import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResData } from 'src/lib/resData';
import { UserEntity } from './entities/user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Bcrypt } from 'src/lib/bcrypt';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: 'IUserService',
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            getByLogin: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>('IUserService');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto = {
        login: 'testuser',
        password: 'password',
      } as CreateUserDto;
      const mockUser = { id: 1, ...createUserDto } as UserEntity;
      jest
        .spyOn(userService, 'create')
        .mockResolvedValue(
          new ResData(HttpStatus.CREATED, 'Created Successfully', mockUser),
        );
      jest
        .spyOn(userService, 'getByLogin')
        .mockResolvedValue(new ResData(404, 'User not found by Login', null));
      jest.spyOn(Bcrypt, 'hash').mockResolvedValue('hashedPassword');

      const result = await controller.create(createUserDto);
      expect(result).toEqual(
        new ResData(HttpStatus.CREATED, 'Created Successfully', mockUser),
      );
    });

    it('should throw an error if user with login already exists', async () => {
      const createUserDto = {
        login: 'testuser',
        password: 'password',
      } as CreateUserDto;
      const mockUser = { id: 1, ...createUserDto } as UserEntity;
      jest
        .spyOn(userService, 'getByLogin')
        .mockResolvedValue(
          new ResData(200, 'User found successfully', mockUser),
        );

      await expect(controller.create(createUserDto)).rejects.toThrow(
        new HttpException(
          'User with this Login name already exist',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const mockUsers = [{ id: 1, login: 'testuser' }] as UserEntity[];
      jest
        .spyOn(userService, 'findAll')
        .mockResolvedValue(new ResData(HttpStatus.OK, 'Success', mockUsers));

      const result = await controller.findAll();
      expect(result).toEqual(new ResData(HttpStatus.OK, 'Success', mockUsers));
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const mockUser = { id: 1, login: 'testuser' } as UserEntity;
      jest
        .spyOn(userService, 'findOne')
        .mockResolvedValue(
          new ResData(HttpStatus.OK, 'User found successfully', mockUser),
        );

      const result = await controller.findOne(1);
      expect(result).toEqual(
        new ResData(HttpStatus.OK, 'User found successfully', mockUser),
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = {
        login: 'updateduser',
        password: 'newpassword',
      } as UpdateUserDto;
      const mockUser = { id: 1, ...updateUserDto } as UserEntity;
      jest
        .spyOn(userService, 'update')
        .mockResolvedValue(
          new ResData(HttpStatus.OK, 'User updated successfully', mockUser),
        );
      jest
        .spyOn(userService, 'getByLogin')
        .mockResolvedValue(new ResData(404, 'User not found by Login', null));
      jest.spyOn(Bcrypt, 'hash').mockResolvedValue('hashedPassword');

      const result = await controller.update(1, updateUserDto);
      expect(result).toEqual(
        new ResData(HttpStatus.OK, 'User updated successfully', mockUser),
      );
    });
  });
});
