import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import * as express from 'express';
import { join } from 'path'

process.env.TZ = 'America/Bogota'

async function bootstrap() {
    // Create a NestJS application instance by passing the AppModule to the NestFactory
    const app = await NestFactory.create(AppModule)

    // Use DocumentBuilder to create a new Swagger document configuration
    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('SGCC API') // Set the title of the API
        .setDescription('SGCC API description') // Set the description of the API
        .setVersion('0.1') // Set the version of the API
        .build() // Build the document

    // Create a Swagger document using the application instance and the document configuration
    const document = SwaggerModule.createDocument(app, config)

    // Setup Swagger module with the application instance and the Swagger document
    SwaggerModule.setup('api', app, document)

    app.useGlobalPipes(new ValidationPipe())

    // Enable Cors
    app.enableCors({
        // allowedHeaders: ['content-type'],
        origin: process.env.NEXTJS_PUBlIC_URL,
        credentials: true,
    })

    app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

    app.use(cookieParser())

    await app.listen(3000)
}
bootstrap()
