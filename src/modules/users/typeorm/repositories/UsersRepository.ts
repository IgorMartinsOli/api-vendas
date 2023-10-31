import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";

@EntityRepository(User)
class UsersRepository extends Repository<User> {
    public async findByName(name: string): Promise<User | undefined>{
        const user = await this.findOne({
            where: {
                name,
            }
        })

        const result = user != null || user != undefined ? user : undefined;
        return result;
    }

    public async findById(id: string): Promise<User | undefined>{
        const user = await this.findOne({
            where: {
                id,
            }
        })

        const result = user != null || user != undefined ? user : undefined;
        return result;
    }

    public async findByEmail(email: string): Promise<User | undefined>{
        const user = await this.findOne({
            where: {
                email,
            }
        })

        const result = user != null || user != undefined ? user : undefined;
        return result;
    }
}

export default UsersRepository;