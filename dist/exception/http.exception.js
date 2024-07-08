"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, message, validationErrors) {
        super(message);
        this.status = status;
        this.validationErrors = validationErrors;
    }
}
exports.default = HttpException;
//# sourceMappingURL=http.exception.js.map