module.exports = class ResponseUtils {
    
    static respondError(res, status, msg) {
        return res.status(status).send({ message: msg })
    }

    static respond(res, status, payloads) {
        return res.status(status).send(payloads)
    }
}