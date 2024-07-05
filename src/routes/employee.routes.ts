import EmployeeController from "../controller/employee.controller";
import employeeRepository from "../repository/employee.repository";
import EmployeeService from "../service/employee.service";

const employeeController = new EmployeeController(new EmployeeService(new employeeRepository()))
const employeeRouter = employeeController.router

export default employeeRouter
