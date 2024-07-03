"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employeeRouter_1 = require("./employeeRouter");
const loggerMiddleware_1 = __importDefault(require("./loggerMiddleware"));
const express = require('express');
const server = new express();
server.use(loggerMiddleware_1.default);
server.use("/employee", employeeRouter_1.employeeRouter);
// server.get("/getData", (req:Request, res:Response) => {
//     let data = {
//         profile: {
//             name: "johaan",
//             age: 22
//         }
//     };
//     console.log(data.profile.name);
//     res.status(200).send(data);
// });
server.listen(3000, () => {
    console.log("server is running on port 3000");
});
// function average(a,b){
//     return "abc"
// }
// interface Person {
//     name : string,
//     age : number
//     field1: string | number,
// }
// const test: Person = {
//     name: "Abc",
//     age: 20,
//     field1: "johaan"
// }
// interface Name {
//     name: string
// }
// interface Age {
//     age: number
// }
// type Person1 = Name & Age;
// let myPerson: Person1 = {
//     name: "johaan",
//     age: 22
// }
//# sourceMappingURL=app.js.map