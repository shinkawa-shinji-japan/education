import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// CORSを許可する
app.use(function (req, res, next) {
  // console.log(req.headers)
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// get / に対するレスポンスを定義
app.get("/", (req: Request, res: Response) => {
  console.log("access / ");
  res.send("Express + TypeScript Server");
});

// get /users に対するレスポンスを定義
app.get("/users", (req: Request, res: Response) => {
  console.log("access /users ");
  res.send("toshi,tama,shinji,miyaji");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
