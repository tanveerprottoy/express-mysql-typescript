import express from 'express';

export default class ResponseUtils {

    static respond(
        res: express.Response,
        status: number,
        payloads: Object
    ): express.Response {
        return res.status(status).send(payloads);
    }

    static respondError(
        res: express.Response,
        status: number,
        message: String
    ): express.Response {
        return res.status(status).send(
            { message: message }
        );
    }
}