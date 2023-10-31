import { Request, Response } from "express";
import ListUserService from "../services/ListUserService";
import CreateUserService from "../services/CreateUserService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response>{
        const userAvatarService = new UpdateUserAvatarService();

        const user = userAvatarService.execute({
            userId: request.user.id,
            avatarFileName: request.file?.filename,
        });

        return response.json(user);
    }
}