const UserModel = require('../data/models/user-model');
const HttpException = require('../utils/httpexception-utils');
const { validationResult } = require('express-validator');
const ResponseUtils = require('../utils/res-utils');
const constants = require('../utils/constants');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class UserController {
    
    getAllUsers = async (req, res, next) => {
        //console.log("working")
        let userList = await UserModel.getAll();
        if (!userList) {
            return ResponseUtils.respondError(res, constants.HTTP_404, constants.NOT_FOUND);
        }

        // userList = userList.map(user => {
        //     const { password, ...userWithoutPassword } = user;
        //     return userWithoutPassword;
        // });

        return ResponseUtils.respond(
            res,
            constants.HTTP_200,
            userList
        );

    };

    getUserById = async (req, res, next) => {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return ResponseUtils.respondError(res, constants.HTTP_404, constants.NOT_FOUND);
        }
        return ResponseUtils.respond(
            res,
            constants.HTTP_200,
            user
        );
    };

    getUserByUserName = async (req, res, next) => {
        const user = await UserModel.findOne({ username: req.params.username });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };

    getCurrentUser = async (req, res, next) => {
        const { password, ...userWithoutPassword } = req.currentUser;

        res.send(userWithoutPassword);
    };

    createUser = async (req, res, next) => {
        this.checkValidation(req, res);

        const result = await UserModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('User was created!');
    };

    updateUser = async (req, res, next) => {
        this.checkValidation(req, res);
        const { full_name } = req.body;
        const result = await UserModel.update({ full_name: full_name }, req.params.id);
        if (!result) {
            return ResponseUtils.respondError(res, constants.HTTP_401, constants.NOT_FOUND);
        }
        const { affectedRows, changedRows } = result;
        if (!affectedRows) {
            return ResponseUtils.respond(
                res,
                constants.HTTP_404,
                'User not found'
            );
        }
        return ResponseUtils.respond(
            res,
            constants.HTTP_200,
            {
                message: 'User updated successfully'
            }
        );
    };

    deleteUser = async (req, res, next) => {
        const result = await UserModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'User not found');
        }
        res.send('User has been deleted');
    };

    userLogin = async (req, res, next) => {
        this.checkValidation(req, res);

        const { email, password: pass } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new HttpException(401, 'Unable to login!');
        }

        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new HttpException(401, 'Incorrect password!');
        }

        // user matched!
        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
            expiresIn: '24h'
        });

        const { password, ...userWithoutPassword } = user;

        res.send({ ...userWithoutPassword, token });
    };

    checkValidation = (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
}

module.exports = new UserController;