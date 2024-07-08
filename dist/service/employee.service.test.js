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
const jest_when_1 = require("jest-when");
const employee_entity_1 = __importDefault(require("../entity/employee.entity"));
const employee_repository_1 = __importDefault(require("../repository/employee.repository"));
const employee_service_1 = require("./employee.service");
const department_repository_1 = __importDefault(require("../repository/department.repository"));
const department_entity_1 = __importDefault(require("../entity/department.entity"));
describe("Employee Service", () => {
    let employeeRepository;
    let departmentRepository;
    let employeeService;
    beforeAll(() => {
        const dataSource = {
            getRepository: jest.fn(),
        };
        employeeRepository = new employee_repository_1.default(dataSource.getRepository(employee_entity_1.default));
        departmentRepository = new department_repository_1.default(dataSource.getRepository(department_entity_1.default));
        employeeService = new employee_service_1.EmployeeService(employeeRepository, departmentRepository);
    });
    it("should return allEmployees", () => __awaiter(void 0, void 0, void 0, function* () {
        const mock = jest.fn(employeeRepository.find).mockResolvedValue([]);
        employeeRepository.find = mock;
        const users = yield employeeService.getAllEmployees();
        expect(users).toEqual([]);
        expect(mock).toHaveBeenCalledTimes(1);
    }));
    it("should return employee with id", () => __awaiter(void 0, void 0, void 0, function* () {
        // const idEmployee = new Employee();
        // idEmployee.
        // const mock = jest
        //     .fn(employeeRepository.findOneBy)
        //     .mockResolvedValue({ id: 1, name: "as" } as Employee);
        const mock = jest.fn();
        (0, jest_when_1.when)(mock)
            .calledWith({ id: 1 })
            .mockResolvedValue({ id: 1, name: "as" })
            .calledWith({ id: 2 })
            .mockResolvedValue({ id: 2, name: "valuess" });
        employeeRepository.findOneBy = mock;
        const users = yield employeeService.getEmployeeByID(2);
        expect(users.name).toEqual("as");
        expect(mock).toHaveBeenCalledTimes(1);
    }));
});
//# sourceMappingURL=employee.service.test.js.map