import { PersonHandlers } from "@domain/person";
import Config from "@utils/Config";
import compression from "compression";
import cors from "cors";
import * as express from "express";

const app: express.Application = express.default();
const port = Config.port;

// Body parsing Middleware
app.use(express.json());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: Config.cors.origin,
  })
);
app.disable("x-powered-by");

app.use("/person", PersonHandlers.GetRouter());

process.stdout.on("error", function (err) {
  err.code == "EPIPE" && process.exit(0);
});

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
