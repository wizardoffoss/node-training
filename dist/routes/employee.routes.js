"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_controller_1 = require("../controller/employee.controller");
const data_source_db_1 = __importDefault(require("../db/data-source.db"));
const department_entity_1 = __importDefault(require("../entity/department.entity"));
const employee_entity_1 = __importDefault(require("../entity/employee.entity"));
const department_repository_1 = __importDefault(require("../repository/department.repository"));
const employee_repository_1 = __importDefault(require("../repository/employee.repository"));
const employee_service_1 = require("../service/employee.service");
const employeeController = new employee_controller_1.EmployeeController(new employee_service_1.EmployeeService(new employee_repository_1.default(data_source_db_1.default.getRepository(employee_entity_1.default)), new department_repository_1.default(data_source_db_1.default.getRepository(department_entity_1.default))));
const employeeRoutes = employeeController.router;
exports.default = employeeRoutes;
//# sourceMappingURL=employee.routes.js.map