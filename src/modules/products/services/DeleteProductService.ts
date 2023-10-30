import { getCustomRepository } from "typeorm";
import { PorductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

class DeleteProductService {
    public async execute( {id }: IRequest): Promise<string>{
        const productRepository = getCustomRepository(PorductRepository);
        const product = await productRepository.findOne(id);

        if(!product){
            throw new AppError('Product not found');
        };

        await productRepository.remove(product);

        return 'Produto excluido com sucesso';

    }
}

export default DeleteProductService;