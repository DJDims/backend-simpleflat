import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FlatModule } from './flat/flat.module';
import { UserModule } from './user/user.module';
import { HouseModule } from './house/house.module';
import { CityModule } from './city/city.module';
import { CounterModule } from './counter/counter.module';
import { ReadingModule } from './reading/reading.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        FlatModule,
        UserModule,
        HouseModule,
        CityModule,
        CounterModule,
        ReadingModule,
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
        MailerModule.forRoot({
            transport: {
                host: '',
                auth: {
                    user: '',
                    pass: '',
                },
            },
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
