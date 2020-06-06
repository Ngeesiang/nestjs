import { Sequelize } from 'sequelize-typescript';
import { Product } from '../products/product.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123Siang5393',
        database: 'products',
      });
      sequelize.addModels([Product]);
      await sequelize.sync();
      return sequelize;
    },
  },
];