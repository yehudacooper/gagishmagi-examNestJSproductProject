import { Controller, Get, HttpException, HttpStatus, Param, Patch, Body, Delete, Post, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDTO } from './dto/create-product.dto';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {

     }

    @Get('all')
    public async getProducts(): Promise<Product[]> {
        const products = await this.productService.getProducts();
        // return products;
        if(products){
            return products;
        }
        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'There are no products',
        }, HttpStatus.FORBIDDEN);
    }

    @Get('/:productId')
    public async getProduct(@Param('productId',ParseIntPipe) productId: number) {
        const product = await this.productService.getProduct(productId);
        if(product){return product;}
        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'There is no product with such id',
        }, HttpStatus.FORBIDDEN);
    }

    @Post('create')
    public async createProduct(
        @Body(ValidationPipe) createProductDto: CreateProductDTO,
    ): Promise<Product> {
        const product = await this.productService.createProduct(createProductDto);
        return product;
    }


    
    @Patch('/edit/:productId')
    public async editProduct(
        @Body(ValidationPipe) createProductDto: CreateProductDTO,
        @Param('productId',ParseIntPipe) productId: number,
      ): Promise<Product> {
        try{
        const product = await this.productService.editProduct(
            productId,
            createProductDto,
        );
        return product;
        }
        catch{
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'There is no product with such id to edit',
            }, HttpStatus.FORBIDDEN);
        }
    }

    @Delete('/delete/:productId')
    public async deleteProduct(@Param('productId',ParseIntPipe) productId: number) {
        try{
            const deletedProduct = await this.productService.deleteProduct(productId);
            return deletedProduct;
        }
        catch{
        
                throw new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    error: 'There is no product with such id to edit',
                }, HttpStatus.FORBIDDEN);
            

        }
    }


}
