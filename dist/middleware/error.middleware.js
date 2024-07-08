"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = __importDefault(require("../exception/http.exception"));
const errorMiddleware = (error, req, res, next) => {
    try {
        if (error instanceof http_exception_1.default) {
            const errorObject = {
                error: error.message,
                statusCode: error.status,
                errors: [],
            };
            if (error.validationErrors) {
                const validationErrorValues = [];
                error.validationErrors.forEach((validationError) => {
                    const validationErrorConstraints = validationError.constraints;
                    // console.log(validationErrorConstraints);
                    for (let key in validationErrorConstraints) {
                        // console.log(key);
                        validationErrorValues.push(validationErrorConstraints[key]);
                    }
                });
                errorObject.errors = validationErrorValues;
            }
            res.status(error.status).json(errorObject);
        }
        else {
            res.status(500).send({ error: error.message });
        }
    }
    catch (error) {
        console.error(error.stack);
        next(error);
    }
};
exports.default = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map