import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('ACCESS_TOKEN_SECRET'),
                signOptions: {
                    expiresIn: '30d',
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
