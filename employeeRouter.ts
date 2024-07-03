const express = require("express")
import { Request, Response } from "express";
import Employee from "./Employee";
import { emitKeypressEvents } from "readline";

let employeeRouter = new express()
let count: number = 2

const employees: Employee[] = [
    {id: 1, email: "employee1@gmail.com", name: "Employee1", createdAt: new Date(), updatedAt: new Date()},
    {id: 2, email: "employee2@gmail.com", name: "Employee2",  createdAt: new Date(), updatedAt: new Date()}
 ]

 employeeRouter.get("/", (req:Request, res:Response) => {
    console.log(req.url);
    res.status(200).send("get all employees");
});
employeeRouter.get("/:id", (req:Request, res:Response) => {
    console.log(req.url);
    res.status(200).send("get all employees");
});

employeeRouter.post("/", (req:Request, res:Response) => {
    console.log(req.body);
    const newEmployee = new Employee();
    newEmployee.email = req.body.email;
    newEmployee.name = req.body.name
    newEmployee.createdAt= new Date()
    newEmployee.updatedAt = new Date()
    newEmployee.id = ++count;
    employees.push(newEmployee)
    const employee = employees.find((record) => record.id === Number(req.params.id))
    res.status(200).send(newEmployee);
});

employeeRouter.put("/:id", (req:Request, res:Response) => {
    console.log(req.url);
    const employee = employees.find((record) => record.id === Number(req.params.id))
    employee.name = req.body.name
    employee.email = req.body.email
    employee.updatedAt = new Date()
    res.status(200).send(employee);
});

employeeRouter.delete("/:id", (req:Request, res:Response) => {
    console.log(req.url);
    employees.splice(employees.findIndex((record) => {record.id === Number(req.params.id)}),1)
    res.status(204).send("delete on an employee");
});

export{
    employeeRouter
}