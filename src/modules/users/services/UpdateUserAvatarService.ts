import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import path from "path";
import uploadConfig from '@config/Upload'
import fs from 'fs'

interface IRequest {
    userId: string,
    avatarFileName: string,
}

class UpdateUserAvatarService {
    public async execute({ userId, avatarFileName}: IRequest): Promise<User | undefined>{
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findById(userId);

        if(!user){
            throw new AppError('User not found');
        }

        if(user.avatar){
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;
        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;