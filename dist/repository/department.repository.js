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
Object.defineProperty(exports, "__esModule", { value: true });
class DepartmentRepository {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    //  = dataSource.getRepository(Department)
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentRepository.find({ relations: { employees: true } });
        });
    }
    findOneBy(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentRepository.findOne({
                where: filter,
                relations: { employees: true },
            });
        });
    }
    save(newDepartment) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentRepository.save(newDepartment);
        });
    }
    count(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentRepository.count({ where: filter });
        });
    }
    softDelete(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentRepository.softDelete(filter);
        });
    }
    softRemove(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentRepository.softRemove(filter);
        });
    }
}
exports.default = DepartmentRepository;
//# sourceMappingURL=department.repository.js.map