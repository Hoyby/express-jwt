import 'reflect-metadata' 
import { createConnection } from "typeorm";
import express, { Application } from "express";
// import Router from "./routes";
import dbConfig from "./config/database";
import jwt from "jsonwebtoken"
import Router from "./routes"
import bodyParser from "body-parser";


const PORT = process.env.PORT || 8000
const app: Application = express();

//dotenv
//cookieParser
//cors

app.use(bodyParser.urlencoded({ extended: false}))

app.use(Router)

app.get('/', (req, res) => {
    res.send("hello world")
})


createConnection(dbConfig)
  .then((_connection) => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  });