const ApplicationError = require('./ApplicationError');
class ApiError extends ApplicationError {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
<<<<<<< HEAD
=======

    get details() {
        return {statusCode: this.statusCode};
      }
>>>>>>> 19ec1a8 (Adding and Fixing Unit Testing on Authentication and API Error)
}

module.exports = ApiError;
