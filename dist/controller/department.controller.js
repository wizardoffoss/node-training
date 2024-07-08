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
const express_1 = require("express");
const http_exception_1 = __importDefault(require("../exception/http.exception"));
const role_enum_1 = require("../utils/role.enum");
const class_transformer_1 = require("class-transformer");
const department_dto_1 = require("../dto/department.dto");
const class_validator_1 = require("class-validator");
const authorize_middleware_1 = __importDefault(require("../middleware/authorize.middleware"));
class DepartmentController {
    // private departmentService = new DepartmentService()
    constructor(departmentService) {
        this.departmentService = departmentService;
        this.getAllDepartments = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.role) {
                    throw new http_exception_1.default(403, "Access Forbidden");
                }
                const departments = yield this.departmentService.getAllDepartments();
                res.status(200).send(departments);
            }
            catch (error) {
                next(error);
            }
        });
        this.getDepartmentByID = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.role) {
                    throw new http_exception_1.default(403, "Access Forbidden");
                }
                const departmentID = Number(req.params.departmentID);
                if (!departmentID) {
                    throw new http_exception_1.default(400, "The department ID must be an integer");
                }
                const department = this.departmentService.getDepartmentByID(departmentID);
                res.status(200).send(department);
            }
            catch (error) {
                next(error);
            }
        });
        this.createDepartment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (false) {
                    throw new http_exception_1.default(403, "Access Forbidden");
                }
                const departmentDto = (0, class_transformer_1.plainToInstance)(department_dto_1.CreateDepartmentDto, req.body);
                const errors = yield (0, class_validator_1.validate)(departmentDto);
                if (errors.length) {
                    const errorString = "Validation Failed!";
                    throw new http_exception_1.default(400, errorString, errors);
                }
                const newDepartment = yield this.departmentService.createDepartment(departmentDto.name);
                // const { name } = req.body;
                // const newDepartment = await this.departmentService.createDepartment(name);
                res.status(201).send(newDepartment);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateDepartment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.role !== role_enum_1.Role.HR) {
                    throw new http_exception_1.default(403, "Access Forbidden");
                }
                const departmentID = Number(req.params.departmentID);
                if (!departmentID) {
                    throw new http_exception_1.default(400, "The department ID must be an integer");
                }
                const departmentDto = (0, class_transformer_1.plainToInstance)(department_dto_1.UpdateDepartmentDto, req.body);
                const errors = yield (0, class_validator_1.validate)(departmentDto);
                if (errors.length) {
                    const errorString = "Validation Failed!";
                    throw new http_exception_1.default(400, errorString, errors);
                }
                const updatedDepartment = yield this.departmentService.updateDepartment(departmentID, departmentDto.name);
                res.status(200).send(updatedDepartment);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteDepartment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.role !== role_enum_1.Role.HR) {
                    throw new http_exception_1.default(403, "Access Forbidden");
                }
                const departmentID = Number(req.params.departmentID);
                if (!departmentID) {
                    throw new http_exception_1.default(400, "The department ID must be an integer");
                }
                const deletedDepartment = yield this.departmentService.deleteDepartment(departmentID);
                // return deletedDepartment;
                res.status(200).send(deletedDepartment);
            }
            catch (error) {
                next(error);
            }
        });
        this.router = (0, express_1.Router)();
        this.router.get("/", authorize_middleware_1.default, this.getAllDepartments);
        this.router.get("/:departmentID", authorize_middleware_1.default, this.getDepartmentByID);
        this.router.post("/", authorize_middleware_1.default, this.createDepartment);
        this.router.put("/:departmentID", authorize_middleware_1.default, this.updateDepartment);
        this.router.delete("/:departmentID", authorize_middleware_1.default, this.deleteDepartment);
    }
}
exports.default = DepartmentController;
//# sourceMappingURL=department.controller.js.map