// import { employeeRouter } from "./employeeRouter";
// import loggerMiddleware from "./loggerMiddleware";
// import bodyParser from "body-parser";
// import dataSource from "./data-source";

// import express from 'express'
// const server = express();

// server.use(bodyParser.json())
// server.use(loggerMiddleware)


// //server.use("/employee", employeeRouter)

// (async () => {
//     try {
//         console.log("hello")
//       await dataSource.initialize();
//     } catch (e) {
//       console.log("Failed", e);
//       process.exit(1);
//     }
//     server.listen(3000, () => {
//       console.log("server listening to 3000");
//     });
//   })();


import express from "express";
import bodyparser from "body-parser";
import loggerMiddleware from "./middleware/logger.middleware";
import dataSource from "./db/data-source.db";
import employeeRouter from "./routes/employee.routes";
import HttpException from "./exceptions/http.exceptions";
import { error } from "console";
import errorMiddleware from "./middleware/error.middleware";

const server = express();
server.use(bodyparser.json());
server.use(loggerMiddleware);



server.use("/employee", employeeRouter);

server.use(errorMiddleware)

server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hello world typescript");
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
})();