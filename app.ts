import { employeeRouter } from "./employeeRouter";
import loggerMiddleware from "./loggerMiddleware";
import bodyParser from "body-parser";
import dataSource from "./data-source";

const express = require('express');
const server = new express();

server.use(bodyParser.json())
server.use(loggerMiddleware)


server.use("/employee", employeeRouter)


server.listen(3000, () => {
    console.log("server is running on port 3000")
});

(async () => {
    try {
      await dataSource.initialize();
    } catch (e) {
      console.log("Failed", e);
      process.exit(1);
    }
    server.listen(3000, () => {
      console.log("server listening to 3000");
    });
  })

