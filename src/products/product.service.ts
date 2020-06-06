import { Injectable, Inject } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product)
        private productModel: typeof Product,
        private sequelize: Sequelize
      ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await product.destroy();
  }

  async createMany() {
    try {
      await this.sequelize.transaction(async t => {
        const transactionHost = { transaction: t };
  
        await this.productModel.create(
            { title: 'Item1', description: 'Test item', price: 10},
            transactionHost,
        );
        console.log("Item added")
        await this.productModel.create(
            { title: 'Item2', description: 'Test item', price: 20},
            transactionHost,
        );
        console.log("Item added")
      });
    } catch (err) {
        console.log("Error in adding item")
      // Transaction has been rolled back
      // err is whatever rejected the promise chain returned to the transaction callback
    }
  }

  async create(product: {title: string, description: string, price: number}) {
      try {
          await this.sequelize.transaction(async t => {
              const transactionHost = { transaction: t };

              await this.productModel.create(
                  product, 
                  transactionHost);
                  console.log("Item: " + product.title + " added");
          });
          } catch (err) {
              console.log("Error in adding item")
          }
      }
  }