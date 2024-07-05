"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_controller_1 = __importDefault(require("../controller/employee.controller"));
const employee_repository_1 = __importDefault(require("../repository/employee.repository"));
const employee_service_1 = __importDefault(require("../service/employee.service"));
const employeeController = new employee_controller_1.default(new employee_service_1.default(new employee_repository_1.default()));
const employeeRouter = employeeController.router;
exports.default = employeeRouter;
//# sourceMappingURL=employee.routes.js.map