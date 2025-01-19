import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/User.entity';
import { Repository } from 'typeorm';
import { AuthRegisterDto } from './dto/auth-register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(params: AuthRegisterDto) {
    const checkUsername = await this.userRepo.exists({
      where: { username: params.username },
    });

    if (checkUsername)
      throw new ConflictException('username is already exists');

    const user = this.userRepo.create(params);
    await this.userRepo.save(user);

    delete user.password;

    return user;
  }

  async login(params: AuthLoginDto) {
    const user = await this.userRepo.findOne({
      where: { username: params.username },
    });
    if (!user) throw new NotFoundException('username or password is wrong');

    const checkPassword = bcrypt.compare(params.password, user.password);
    if (!checkPassword)
      throw new NotFoundException('username or password is wrong');

    const token = this.jwtService.sign({ userId: user.id });

    return {
      user: {
        ...user,
        password: undefined,
      },
      token,
    };
  }
}
