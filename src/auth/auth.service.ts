import {
  ConflictException,
  Dependencies,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { SignDto } from './dto/sign.dto';

@Dependencies(UsersService, JwtService)
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {
    ((this.userService = userService), (this.jwtService = jwtService));
  }

  // register user
  async registerUser(registterDto: RegisterDto) {
    // cek user apakah sudah ada

    const existingUser = await this.userService.findByEmail(registterDto.email);
    if (existingUser) {
      throw new ConflictException(' email sudah digunakan ');
    }

    // hash password
    const hashHedPassword = await bcrypt.hash(registterDto.password, 10);

    // create user
    const user = await this.userService.createUser({
      ...registterDto,
      password: hashHedPassword,
    });

    // buat token
    const payload = { email: user.email, sub: user.id };
    const acces_token = await this.jwtService.signAsync(payload);

    return {
      acces_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  // login user
  async SignUser(signDto: SignDto) {
    // find user
    const user = await this.userService.findByEmail(signDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentilas User');
    }

    // validate password
    const IsPasswordValid = await bcrypt.compare(
      signDto.password,
      user.password,
    );
    if (!IsPasswordValid) {
      throw new UnauthorizedException('Invalid credential password');
    }

    // generate token
    const payload = { email: user.email, sub: user.id };

    // return
    return {
      acces_token: await this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  // validation user
}
