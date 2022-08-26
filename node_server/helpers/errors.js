class NotFoundError extends Error {
    constructor (message = "resource not found") {
        this.statusCode = 404;
        super(message)
        this.message = message;
    }
}

module.exports = {
    NotFoundError
}