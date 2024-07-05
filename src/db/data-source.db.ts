import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Employee from "../entity/employee.entity";

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    database: "training",
    username: "postgres",
    password: "password",
    extra: { max: 5, min: 2},
    synchronize: false,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
    entities: ["dist/entity/*.js"],
    migrations: ["dist/db/migrations/*.js"]
})

export default dataSource