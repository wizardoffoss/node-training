import {IsEmail, isEmail, IsNotEmpty, IsString } from "class-validator"
export class CreateEmployeeDto {

    @IsNotEmpty()
    @IsString()
    name: string
    
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    age: number

    @IsNotEmpty()
    address: any
}