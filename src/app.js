import "regenerator-runtime/runtime.js";
import express from "express";

import middlewareConfig from "./db/config/middlewares.js";
import config from "./db/config/config.js";

import { UserRoutes } from "./modules";

const { port, isLocal, local_port } = config;

// const mainPort = isLocal ? local_port : port;

const app = express();
middlewareConfig(app);

// list all import routes above
const routes = [UserRoutes];

routes.map((route) => app.use("/api/v1", route));

app.all("*", (req, res) =>
	res.status(404).send({
		status: "error",
		message: "you have entered an incorrect route",
	})
);

app
	.listen(port, () => console.log(`Welcome, listening on ${port}`))
	.on("error", (err) => {
		if (err.syscall !== "listen") {
			throw err;
		}
		const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
		switch (err.code) {
			case "EACCES":
				console.error(`${bind} requires elevated privileges`);
				process.exit(1);
				break;
			case "EADDRINUSE":
				console.error(`${bind} is already in use`);
				process.exit(1);
				break;
			default:
				throw err;
		}
	});
