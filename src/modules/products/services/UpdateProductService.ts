import { getCustomRepository } from "typeorm";
import { PorductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string,
    name: string,
    price: number,
    quantity: number,
}
class UpdateProductService {
    public async execute( {id, name, price, quantity }: IRequest): Promise<Product>{
        const productRepository = getCustomRepository(PorductRepository);
        
        const product = await productRepository.findOne(id);

        if(!product){
            throw new AppError('Product not found');
        }

        const productExists = await productRepository.findByName(name);
        if (productExists && name != product.name) {
            const errorMessage = 'A product with the same name already exists.';
            throw new AppError(errorMessage);
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productRepository.save(product);

        return product;
    }
}

export default UpdateProductService;