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
const department_entity_1 = __importDefault(require("../entity/department.entity"));
const http_exception_1 = __importDefault(require("../exception/http.exception"));
class DepartmentService {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
        //  = new DepartmentRepository()
        this.getAllDepartments = () => __awaiter(this, void 0, void 0, function* () {
            return this.departmentRepository.findAll();
        });
        this.getDepartmentByID = (departmentID) => __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.departmentRepository.findOneBy({
                id: departmentID,
            });
            if (!employee) {
                throw new http_exception_1.default(404, "Department Not Found");
            }
            return employee;
        });
        this.getDepartmentByName = (departmentName) => __awaiter(this, void 0, void 0, function* () {
            // return this.departmentRepository.findOneBy({ name: departmentName });
            const employee = yield this.departmentRepository.findOneBy({
                name: departmentName,
            });
            if (!employee) {
                throw new http_exception_1.default(404, "Department Not Found");
            }
            return employee;
        });
        this.createDepartment = (name) => __awaiter(this, void 0, void 0, function* () {
            const newDepartment = new department_entity_1.default();
            newDepartment.name = name;
            return this.departmentRepository.save(newDepartment);
        });
        this.updateDepartment = (id, name) => __awaiter(this, void 0, void 0, function* () {
            // const newDepartment = new Department()
            const existingDepartment = yield this.getDepartmentByID(id);
            existingDepartment.name = name;
            return this.departmentRepository.save(existingDepartment);
        });
        this.deleteDepartment = (id) => __awaiter(this, void 0, void 0, function* () {
            const existingDepartment = yield this.getDepartmentByID(id);
            if (existingDepartment.employees.length) {
                throw new http_exception_1.default(400, "Non-empty departments cannot be deleted");
            }
            yield this.departmentRepository.softRemove(existingDepartment);
            return existingDepartment;
        });
    }
}
exports.default = DepartmentService;
//# sourceMappingURL=department.service.js.map