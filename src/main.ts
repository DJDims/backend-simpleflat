import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api');
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Simpleflat list api')
        .setVersion('1.0')
        .addBearerAuth({
            name: 'Authorization',
            bearerFormat: 'JWT',
            scheme: 'bearer',
            type: 'http',
            in: 'header',
        })
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/swagger', app, document);
    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT');
    await app.listen(port);
}
bootstrap();
