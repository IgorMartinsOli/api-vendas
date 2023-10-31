import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import { hash } from "bcryptjs";

interface IRequest {
    name: string,
    email: string,
    password: string,
}

class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<User>{
        const usersRepository = getCustomRepository(UsersRepository);
        const userExists = await usersRepository.findByEmail(email);

        if(userExists !== undefined){
            throw new AppError('User already exists');
        }

        const hashedPassword = await hash(password, 8);
        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;