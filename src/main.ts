require('dotenv').config()

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import { join } from 'path'
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n'

process.env.TZ

const port = process.env.PORT || 3000
console.log(process.env.NEXTJS_PUBLIC_URL)

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

    app.useGlobalPipes(
        new I18nValidationPipe(),

        // new ValidationPipe({
        //     exceptionFactory: (errors) => {
        //         const result = errors.map((error) => ({
        //             property: error.property,
        //             message: error.constraints[Object.keys(error.constraints)[0]],
        //         }))
        //         return new BadRequestException(result)
        //     },
        //     stopAtFirstError: true,
        // }),
    )

    app.useGlobalFilters(new I18nValidationExceptionFilter())

    // Enable Cors
    app.enableCors({
        origin: 'https://sgcc-fronted.vercel.app',
        credentials: true,
    })

    app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))

    app.use(cookieParser())

    await app.listen(port)
}
bootstrap()
