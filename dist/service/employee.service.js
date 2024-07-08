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
exports.EmployeeService = void 0;
const address_entity_1 = __importDefault(require("../entity/address.entity"));
const employee_entity_1 = __importDefault(require("../entity/employee.entity"));
const http_exception_1 = __importDefault(require("../exception/http.exception"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../utils/constants");
class EmployeeService {
    constructor(employeeRepository, departmentRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.getAllEmployees = () => __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.find();
        });
        this.getEmployeeByID = (employeeID) => __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRepository.findOneBy({
                id: employeeID,
            });
            if (!employee) {
                throw new http_exception_1.default(404, `Employee with id: ${employeeID} not found`);
            }
            return employee;
        });
        this.createEmployee = (email, name, age, password, role, address, departmentName) => __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentRepository.findOneBy({
                name: departmentName,
            });
            if (!department) {
                throw new http_exception_1.default(404, `Department with name: ${department} was not found`);
            }
            const newEmployee = new employee_entity_1.default();
            const newAddress = new address_entity_1.default();
            // const newDepartment = new Department()
            newEmployee.name = name;
            newEmployee.email = email;
            newEmployee.age = age;
            newEmployee.role = role;
            newEmployee.password = password ? yield bcrypt_1.default.hash(password, 10) : "";
            newAddress.line1 = address.line1;
            newAddress.pincode = address.pincode;
            newEmployee.address = newAddress;
            newEmployee.department = department;
            return this.employeeRepository.save(newEmployee);
        });
        this.updateEmployeeByID = (id, email, name, age, address, departmentName) => __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentRepository.findOneBy({
                name: departmentName,
            });
            if (!department) {
                throw new http_exception_1.default(404, `Department with name: ${departmentName} was not found`);
            }
            const existingEmployee = yield this.getEmployeeByID(id);
            existingEmployee.name = name;
            existingEmployee.email = email;
            existingEmployee.age = age;
            if (address) {
                existingEmployee.address.line1 = address.line1;
                existingEmployee.address.pincode = address.pincode;
            }
            existingEmployee.department = department;
            console.log("errorString");
            return this.employeeRepository.save(existingEmployee);
        });
        this.deleteEmployeeByID = (employeeID) => __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.getEmployeeByID(employeeID);
            return this.employeeRepository.softRemove(employee);
        });
        this.loginEmployee = (email, password) => __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRepository.findOneBy({ email });
            if (!employee) {
                throw new http_exception_1.default(403, "Incorrect Username or Password");
            }
            const result = yield bcrypt_1.default.compare(password, employee.password);
            if (!result) {
                console.log(employee.password, password);
                throw new http_exception_1.default(403, "Incorrect Username or Password");
            }
            const payload = {
                name: employee.name,
                email: employee.email,
                role: employee.role,
            };
            const token = jsonwebtoken_1.default.sign(payload, constants_1.JWT_SECRET, {
                expiresIn: constants_1.JWT_VALIDITY,
            });
            return { token };
        });
    }
}
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map