import {
	IsEmail,
	isEnum,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from "class-validator";

import { Type } from "class-transformer";
import "reflect-metadata";
import { CreateAddressDto, UpdateAddressDto } from "./address.dto";
import { CreateDepartmentDto } from "./department.dto";
import { Role } from "../utils/role.enum";
import { Status } from "../utils/status.enum";

class CreateEmployeeDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsNumber()
	age: Number;

	@IsNotEmpty()
	@ValidateNested({ each: true })
	@Type(() => CreateAddressDto)
	address: CreateAddressDto;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsNotEmpty()
	@IsEnum(Role)
	role: Role;

	@IsEnum(Status)
	status: Status;

	@IsNotEmpty()
	@IsString()
	department: string;
}

class UpdateEmployeeDto {
	@IsOptional()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	@IsEmail()
	email: string;

	@IsOptional()
	@IsNumber()
	age: Number;

	@IsOptional()
	@IsEnum(Status)
	status: Status;

	@IsOptional()
	@IsEnum(Role)
	role: Role;

	@IsOptional()
	@ValidateNested({ each: true })
	@Type(() => UpdateAddressDto)
	address: UpdateAddressDto;

	@IsOptional()
	@IsString()
	department: string;
}

export { CreateEmployeeDto, UpdateEmployeeDto };
