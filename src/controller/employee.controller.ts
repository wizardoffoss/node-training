// import EmployeeService from "../service/employee.service";
// import express from "express";

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


















import Employee from "../entity/employee.entity";
import HttpException from "../exceptions/http.exceptions";
import EmployeeService from "../service/employee.service";
import express from "express";
import {NextFunction} from "express";

class EmployeeController {
    public router: express.Router;

    constructor(private employeeService: EmployeeService) {
        this.router = express.Router();

        this.router.get("/", this.getAllEmployees);
        this.router.get("/:id", this.getEmployeeById);
        this.router.post("/", this.createEmployee);
    }
    public getAllEmployees = async (req: express.Request, res: express.Response) => {
        const employees = await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
    }

    public getEmployeeById =  async (req: express.Request, res: express.Response, next:NextFunction) => {

        try{
        const employeeId = Number(req.params.id);
        const employee = await this.employeeService.getEmployeeById(employeeId);
        if(!employee){
            const error = new HttpException(404,`No employee found with id: ${req.params.id}`)
            throw error
        }
        res.status(200).send(employee);
        }
        catch(err){
            next(err)
        }
    }

    public createEmployee = async (req:express.Request, res:express.Response,next:NextFunction) => {
        const {email, name, address, age} = req.body
        const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    try {if (!email.match(emailFormat)) {
      throw new HttpException(400, "Invalid email format");
    }
    const savedEmployee = await this.employeeService.createEmployee(
            email,
            name,
            age,
            address
        )

    res.status(200).send(savedEmployee);
    }
    catch(err){ next(err)}
       
    }

    
}
export default EmployeeController;

