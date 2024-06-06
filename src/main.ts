import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api');
    app.enableCors();
    const swaggerConfig = new DocumentBuilder()
        .setTitle('ManualMaker list api')
        .setVersion('1.0')
        .addBearerAuth({
            name: 'token',
            bearerFormat: 'JWT',
            scheme: 'bearer',
            type: 'apiKey',
            in: 'header',
        })
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/swagger', app, document);
    await app.listen(3000);
}
bootstrap();
