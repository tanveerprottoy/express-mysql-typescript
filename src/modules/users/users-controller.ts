import express from 'express';
import UsersRepository from './users-repository';
import ResponseUtils from '../../utils/response-utils';
import { Constants } from '../../utils/constants';
import dotenv from 'dotenv';
dotenv.config();

class UserController {

    getAllUsers = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<express.Response> => {
        let userList = await UsersRepository.getAll();
        if(!userList) {
            return ResponseUtils.respond(
                res,
                Constants.HTTP_200,
                []
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