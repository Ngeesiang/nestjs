import { Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './product.service';
import { Product } from './product.entity';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductsService) {}

    @Get()
    async findAllProducts(): Promise<Product[]> {
        return this.productService.findAll()
    }

    @Get('addsuccessful')
    async create(product: Product) {
        return this.productService.create(product)
    }

}
