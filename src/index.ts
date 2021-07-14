import 'reflect-metadata' 
import { createConnection } from "typeorm";
import express, { Application } from "express";
import dotenv from "dotenv"
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dbConfig from "./config/database";
import jwt from "jsonwebtoken"
import Router from "./routes"
import bodyParser from "body-parser";

dotenv.config()

const PORT = process.env.PORT || 8000
const app: Application = express();
const corsOption = {credentials:true, orgin: process.env.URL || '*'}

app.use(cors(corsOption))
app.use(cookieParser())
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