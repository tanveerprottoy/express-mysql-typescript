import express from 'express';
import UserModel from '../data/models/user-model';
import ResponseUtils from '../utils/response-utils';
import { Constants } from '../utils/constants';
import dotenv from 'dotenv';
dotenv.config();

class UserController {

    getAllUsers = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<express.Response> => {
        let userList = await UserModel.getAll();
        if (!userList) {
            return ResponseUtils.respondError(
                res,
                 Constants.HTTP_404,
                 Constants.NOT_FOUND
            );
        }
        return ResponseUtils.respond(
            res,
            Constants.HTTP_200,
            userList
        );
    };
}

export default new UserController;