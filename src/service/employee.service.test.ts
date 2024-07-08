import { when } from "jest-when";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import { EmployeeService } from "./employee.service";
import DepartmentRepository from "../repository/department.repository";
import Department from "../entity/department.entity";

describe("Employee Service", () => {
    let employeeRepository: EmployeeRepository;
    let departmentRepository: DepartmentRepository
    let employeeService: EmployeeService;

    beforeAll(() => {
        const dataSource = {
            getRepository: jest.fn(),
        };
        employeeRepository = new EmployeeRepository(
            dataSource.getRepository(Employee)
        ) as jest.Mocked<EmployeeRepository>;
        departmentRepository = new DepartmentRepository(
            dataSource.getRepository(Department)
        ) as jest.Mocked<DepartmentRepository>
        employeeService = new EmployeeService(employeeRepository,departmentRepository);
    });

    it("should return allEmployees", async () => {
        const mock = jest.fn(employeeRepository.find).mockResolvedValue([]);
        employeeRepository.find = mock;

        const users = await employeeService.getAllEmployees();
        expect(users).toEqual([]);
        expect(mock).toHaveBeenCalledTimes(1);
    });

    it("should return employee with id", async () => {
        // const idEmployee = new Employee();
        // idEmployee.
        // const mock = jest
        //     .fn(employeeRepository.findOneBy)
        //     .mockResolvedValue({ id: 1, name: "as" } as Employee);
        const mock = jest.fn();
        when(mock)
            .calledWith({ id: 1 })
            .mockResolvedValue({ id: 1, name: "as" } as unknown as Employee)
            .calledWith({ id: 2 })
            .mockResolvedValue({ id: 2, name: "valuess" });
        employeeRepository.findOneBy = mock;

        const users = await employeeService.getEmployeeByID(2);
        expect(users.name).toEqual("as");
        expect(mock).toHaveBeenCalledTimes(1);
    });
});
