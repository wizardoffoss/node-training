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
exports.EmployeeController = void 0;
const class_transformer_1 = require("class-transformer");
const http_exception_1 = __importDefault(require("../exception/http.exception"));
const express_1 = require("express");
const employee_dto_1 = require("../dto/employee.dto");
const class_validator_1 = require("class-validator");
const role_enum_1 = require("../utils/role.enum");
const authorize_middleware_1 = __importDefault(require("../middleware/authorize.middleware"));
class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService;
        this.getAllEmployees = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.role) {
                    // throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED)
                    throw new http_exception_1.default(403, "Access Forbidden");
                }
                const employees = yield this.employeeService.getAllEmployees();
                res.status(200).send(employees);
            }
            catch (error) {
                next(error);
            }
        });
        this.getEmployeeByID = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.role) {
                    // throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED)
                    throw new http_exception_1.default(403, "Access Forbidden");
                }
                const employeeID = Number(req.params.employeeID);
                if (!Number.isInteger(employeeID)) {
                    throw new http_exception_1.default(400, "ID is not an integer!");
                }
                const employee = yield this.employeeService.getEmployeeByID(employeeID);
                res.status(200).send(employee);
            }
            catch (error) {
                next(error);
            }
        });
        this.createEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const role = req.role;
                if (role !== role_enum_1.Role.HR) {
                    // throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED)
                    throw new http_exception_1.default(403, "Access Forbidden");
                }
                const employeeDto = (0, class_transformer_1.plainToInstance)(employee_dto_1.CreateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(employeeDto);
                if (errors.length) {
                    const errorString = "Validation Failed!";
                    throw new http_exception_1.default(400, errorString, errors);
                }
                const savedEmployee = yield this.employeeService.createEmployee(employeeDto.email, employeeDto.name, employeeDto.age, employeeDto.password, employeeDto.role, employeeDto.address, employeeDto.department);
                res.status(201).send(savedEmployee);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateEmployeeByID = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employeeID = Number(req.params.employeeID);
                if (!Number.isInteger(employeeID)) {
                    throw new http_exception_1.default(400, "ID is not an integer!");
                }
                const employeeDto = (0, class_transformer_1.plainToInstance)(employee_dto_1.UpdateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(employeeDto);
                const role = req.role;
                if (role !== role_enum_1.Role.HR) {
                    // throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED)
                    throw new http_exception_1.default(403, "Access Forbidden");
                }
                if (errors.length) {
                    const errorString = "Validation Failed!";
                    throw new http_exception_1.default(400, errorString, errors);
                }
                const updatedEmployee = yield this.employeeService.updateEmployeeByID(employeeID, employeeDto.email, employeeDto.name, employeeDto.age, employeeDto.address, employeeDto.department);
                res.status(200).send(updatedEmployee);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteEmployeeByID = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employeeID = Number(req.params.employeeID);
                if (!Number.isInteger(employeeID)) {
                    throw new http_exception_1.default(400, "ID is not an integer!");
                }
                const role = req.role;
                if (role !== role_enum_1.Role.HR) {
                    // throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED)
                    throw new http_exception_1.default(403, "Access Forbidden");
                }
                const deleteStatus = yield this.employeeService.deleteEmployeeByID(employeeID);
                res.status(200).send(deleteStatus);
            }
            catch (error) {
                next(error);
            }
        });
        this.loginEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield this.employeeService.loginEmployee(email, password);
                res.status(200).send(token);
            }
            catch (error) {
                next(error);
            }
        });
        this.router = (0, express_1.Router)();
        this.router.get("/", authorize_middleware_1.default, this.getAllEmployees);
        this.router.get("/:employeeID", authorize_middleware_1.default, this.getEmployeeByID);
        this.router.post("/", authorize_middleware_1.default, this.createEmployee);
        this.router.put("/:employeeID", authorize_middleware_1.default, this.updateEmployeeByID);
        this.router.delete("/:employeeID", authorize_middleware_1.default, this.deleteEmployeeByID);
        this.router.post("/login", this.loginEmployee);
    }
}
exports.EmployeeController = EmployeeController;
//# sourceMappingURL=employee.controller.js.map