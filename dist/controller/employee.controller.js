"use strict";
// import EmployeeService from "../service/employee.service";
// import express from "express";
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
// class EmployeeController {
//     private employeeService: EmployeeService
//     public router: express.Router
//     constructor() {
//         this.employeeService = new EmployeeService()
//         this.router = express.Router();
//         this.router.get("/", this.getAllEmployees)
//     }
//     public async getAllEmployees(req:express.Request, res:express.Response){
//         const employees = await this.employeeService.getAllEmployees();
//         res.status(200).send(employees);
//     }
//     public async getEmployeeById(req:express.Request, res:express.Response){
//         const employee = await this.employeeService.getEmployeeById(Number(req.params.id))
//     }
//     //public async createEmployee
// }
// export default EmployeeController
const employee_entity_1 = __importDefault(require("../entity/employee.entity"));
const http_exceptions_1 = __importDefault(require("../exceptions/http.exceptions"));
const express_1 = __importDefault(require("express"));
class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService;
        this.getAllEmployees = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const employees = yield this.employeeService.getAllEmployees();
            res.status(200).send(employees);
        });
        this.getEmployeeById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employeeId = Number(req.params.id);
                const employee = yield this.employeeService.getEmployeeById(employeeId);
                if (!employee) {
                    const error = new http_exceptions_1.default(404, `No employee found with id: ${req.params.id}`);
                    throw error;
                }
                res.status(200).send(employee);
            }
            catch (err) {
                next(err);
            }
        });
        this.createEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, name, address, age } = req.body;
            const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            try {
                if (!email.match(emailFormat)) {
                    throw new http_exceptions_1.default(400, "Invalid email format");
                }
            }
            catch (err) {
                next(err);
            }
            const savedEmployee = yield this.employeeService.createEmployee(email, name, age, address);
            const newEmployee = new employee_entity_1.default();
            res.status(200).send(savedEmployee);
        });
        this.router = express_1.default.Router();
        this.router.get("/", this.getAllEmployees);
        this.router.get("/:id", this.getEmployeeById);
        this.router.post("/", this.createEmployee);
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=employee.controller.js.map