import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    database: "traning",
    username: "postgres",
    password: "password",
    extra: { max: 5, min: 2},
    synchronize: false,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
    entities: []
})

export default dataSource