import { IsString } from 'class-validator';

export class CreateProductDTO {
    @IsString()
    name: string ='enter name';

    @IsString()
    description: string = 'no description';

    @IsString()
    price: string = '0';
}
