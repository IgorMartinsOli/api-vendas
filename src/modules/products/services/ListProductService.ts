import { getCustomRepository } from "typeorm";
import { PorductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";

class ListProductService {
    public async execute(): Promise<Product[]>{
        const productRepository = getCustomRepository(PorductRepository);
        
        return await productRepository.find();
    }
}

export default ListProductService;