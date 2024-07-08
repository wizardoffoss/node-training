import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import loggerMiddleware from "./middleware/logger.middleware";
import dataSource from "./db/data-source.db";
import errorLoggerMiddleware from "./middleware/error.middleware";
import employeeRoutes from "./routes/employee.routes";
import departmentRoutes from "./routes/department.routes";

const server = express();
server.use(loggerMiddleware);
server.use(bodyParser.json());
server.use("/employees", employeeRoutes);
server.use("/departments", departmentRoutes);
server.use(errorLoggerMiddleware);

server.get("/", (req, res) => {
	console.log(req.url);
	res.status(200).send("Hello World");
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
