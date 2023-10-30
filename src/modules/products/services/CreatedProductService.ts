import { getCustomRepository } from "typeorm";
import { PorductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";

interface IRequest {
    name: string,
    price: number,
    quantity: number,
}

class CreateProductService {
    public async execute({ name, price, quantity }: IRequest): Promise<Product>{
        const productRepository = getCustomRepository(PorductRepository);
        const productExists = await productRepository.findByName(name);
        if (productExists) {
            const errorMessage = 'A product with the same name already exists.';
            throw new AppError(errorMessage);
        }
        
        const product = productRepository.create({
            name,
            price,
            quantity
        });

        await productRepository.save(product);

        return product;
    }
}

export default CreateProductService;