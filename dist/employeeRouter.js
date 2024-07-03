"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRouter = void 0;
const express = require("express");
let employeeRouter = new express();
exports.employeeRouter = employeeRouter;
const employees = [
    { id: 1, email: "employee1@gmail.com", name: "Employee1", createdAt: new Date(), updatedAt: new Date() },
    { id: 2, email: "employee2@gmail.com", name: "Employee2", createdAt: new Date(), updatedAt: new Date() }
];
employeeRouter.get("/", (req, res) => {
    console.log(req.url);
    res.status(200).send("get all employees");
});
employeeRouter.get("/:id", (req, res) => {
    console.log(req.url);
    res.status(200).send("get all employees");
});
employeeRouter.post("/:id", (req, res) => {
    console.log(req.url);
    employees.push(req.body);
    res.status(200).send("get an employee");
});
employeeRouter.put("/:id", (req, res) => {
    console.log(req.url);
    const employee = employees.find((record) => record.id === Number(req.params.id));
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.updatedAt = new Date();
    res.status(200).send(employee);
});
employeeRouter.delete("/:id", (req, res) => {
    console.log(req.url);
    employees.splice(employees.findIndex((record) => { record.id === Number(req.params.id); }), 1);
    res.status(204).send("delete on an employee");
});
//# sourceMappingURL=employeeRouter.js.map