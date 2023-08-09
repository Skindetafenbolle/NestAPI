import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';



async function start() {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);


    const config = new DocumentBuilder()
        .setTitle('Урок по nestjs')
        .setDescription('Документация по REST API')
        .setVersion('1.0.0')
        .addTag('dkulbatsky')
        .build()

    const document = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('/api/docs', app, document)
    // app.useGlobalGuards(JwtAuthGuard)


    await app.listen(PORT, ()=>{
            console.log(`Server started on PORT = ${PORT}`)
    })
}

start()