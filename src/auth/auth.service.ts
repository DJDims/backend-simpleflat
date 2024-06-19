import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user = await this.userService.findByEmail(email);
        const passwordMatch = await argon2.verify(user.password, password);
        if (!passwordMatch)
            throw new UnauthorizedException(`Incorrect password`);
        return {
            id: user.id,
            email: user.email,
            accessToken: this.jwtService.sign({
                id: user.id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                status: user.status,
                role: user.role,
            }),
        };
    }
}
