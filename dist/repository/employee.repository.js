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
const data_source_db_1 = __importDefault(require("../db/data-source.db"));
const employee_entity_1 = __importDefault(require("../entity/employee.entity"));
class employeeRepository {
    constructor() {
        this.find = () => __awaiter(this, void 0, void 0, function* () {
            const employeeRepository = this.dataSource.getRepository(employee_entity_1.default);
            return employeeRepository.find();
        });
        this.findOneBy = (filter) => __awaiter(this, void 0, void 0, function* () {
            const employeeRepository = this.dataSource.getRepository(employee_entity_1.default);
            return employeeRepository.findOne({ where: filter });
        });
        this.save = (newEmployee) => __awaiter(this, void 0, void 0, function* () {
            const employeeRepository = this.dataSource.getRepository(employee_entity_1.default);
            employeeRepository.save(newEmployee);
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            const employeeRepository = this.dataSource.getRepository(employee_entity_1.default);
            yield employeeRepository.softDelete(id);
        });
        this.dataSource = data_source_db_1.default;
    }
}
exports.default = employeeRepository;
//# sourceMappingURL=employee.repository.js.map