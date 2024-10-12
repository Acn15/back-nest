import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user/user';
import { CreateUserDto } from './dto/create-users.dto/create-users.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-users.dto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...rest } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      ...rest,
      password: hashedPassword,
    });

    try {
      const savedUser = await this.userRepository.save(user);

      return savedUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User já existe.');
      }
      throw new InternalServerErrorException('Erro ao criar user.');
    }
  }

  async findAll(skip = 0, take = 10): Promise<User[]> {
    return this.userRepository.find({
      skip,
      take,
    });
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`Usuário com email ${email} não encontrado.`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const result = await this.userRepository.update(id, updateUserDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
    }

    const updatedUser = { id, ...updateUserDto };

    return updatedUser as User;
  }

  async delete(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
