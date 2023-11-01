import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: (process.cwd(), `.${process.env.NODE_ENV}.env`)
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: String(process.env.POSTGRES_PASSWORD),
            database: process.env.POSTGRES_DB,
            autoLoadEntities: true,
            entities: [`**/entities/*.entity.js`],
            synchronize: true, // We are using migrations, synchronize should be set to false.
            migrationsRun: true,
            migrations: [join(__dirname, '..', '**/migrations/*.{ts,js}')],
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "storage"),
            exclude: ["/api*"],
          }),
        UsersModule,
        AuthModule,
    ]
})

export class AppModule { }