import { DataSource } from "typeorm";
import dataSource from "../db/data-source.db";
import Employee from "../entity/employee.entity";

class employeeRepository {
    private dataSource: DataSource;
    constructor() {
        this.dataSource = dataSource
    }

    public find = async () => {
        const employeeRepository = this.dataSource.getRepository(Employee)
        return employeeRepository.find()
    }

    public findOneBy = async (filter: Partial<Employee>) => {

        const employeeRepository = this.dataSource.getRepository(Employee)
        return employeeRepository.findOne({where: filter})
    }

    public save = async (newEmployee: Employee) => {
        const employeeRepository = this.dataSource.getRepository(Employee)
        employeeRepository.save(newEmployee)
    }

    public delete = async (id:number) => {

        const employeeRepository = this.dataSource.getRepository(Employee)
        await employeeRepository.softDelete(id)
    }
}

export default employeeRepository