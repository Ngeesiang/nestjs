import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './products/product.controller';
import { SequelizeModule } from '@nestjs/sequelize'
import "reflect-metadata";
import { Product } from './products/product.entity';
import { ProductModule } from './products/product.module';

@Module({
  // imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(),
  imports: [ConfigModule.forRoot(), SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123Siang5393',
      database: 'products',
      models: [Product],
      autoLoadModels: true,
      synchronize: true
    }), ProductModule],
  controllers: [AppController, ProductController],
  providers: [AppService],
})
export class AppModule {}
