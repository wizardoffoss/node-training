import Employee from "../entity/employee.entity";
import employeeRepository from "../repository/employee.repository";

class EmployeeService {
        constructor(private employeeRepository: employeeRepository){

    }

    async getAllEmployees() {
        return this.employeeRepository.find()
    }

    async getEmployeeById(id: number){
        return this.employeeRepository.findOneBy({id})
    }

    async createEmployee(name:string, email:string, age:number, address:any){
        const newEmployee = new Employee()
        newEmployee.email = email
        newEmployee.name = name
        newEmployee.age = age
        newEmployee.address = address
        return this.employeeRepository.save(newEmployee)

        }

    async updateEmployee(id:number, details:Partial<Employee>){
        let employee = await this.employeeRepository.findOneBy({id})
        employee.name = details.name
        employee.email = details.email
        return employee
    }
    }

    export default EmployeeService