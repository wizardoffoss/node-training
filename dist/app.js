"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const logger_middleware_1 = __importDefault(require("./middleware/logger.middleware"));
const data_source_db_1 = __importDefault(require("./db/data-source.db"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const employee_routes_1 = __importDefault(require("./routes/employee.routes"));
const department_routes_1 = __importDefault(require("./routes/department.routes"));
const server = (0, express_1.default)();
server.use(logger_middleware_1.default);
server.use(body_parser_1.default.json());
server.use((0, cors_1.default)());
server.use("/employees", employee_routes_1.default);
server.use("/departments", department_routes_1.default);
server.use(error_middleware_1.default);
server.get("/", (req, res) => {
    console.log(req.url);
    res.status(200).send("Hello World");
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield data_source_db_1.default.initialize();
    }
    catch (e) {
        console.log("Failed", e);
        process.exit(1);
    }
    server.listen(3000, () => {
        console.log("server listening to 3000");
    });
}))();
//# sourceMappingURL=app.js.map