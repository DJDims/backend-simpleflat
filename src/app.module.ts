import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FlatModule } from './flat/flat.module';
import { UserModule } from './user/user.module';
import { HouseModule } from './house/house.module';
import { CityModule } from './city/city.module';
import { CounterModule } from './counter/counter.module';
import { ReadingModule } from './reading/reading.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        FlatModule,
        UserModule,
        HouseModule,
        CityModule,
        CounterModule,
        ReadingModule,
        EmailModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('TYPEORM_HOST'),
                port: configService.get('TYPEORM_PORT'),
                username: configService.get('TYPEORM_USERNAME'),
                password: configService.get('TYPEORM_PASSWORD'),
                database: configService.get('TYPEORM_DATABASE'),
                synchronize: configService.get('TYPEORM_SYNCRONIZE'),
                entities: [configService.get('TYPEORM_ENTITIES')],
            }),
            inject: [ConfigService],
        }),
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
