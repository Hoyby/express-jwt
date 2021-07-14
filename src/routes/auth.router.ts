import express from "express";
import { getUser } from "../repositories/auth.repository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import {jwtTokens} from ../utils/jwt-helpers.js;

const router = express.Router();

router.post("/", async (req, res) => {
    try{
        const {email, password} = req.body;
        const users = await getUser(email)
        //PASSWORD CHECK
        const validPassword = await bcrypt.compare(password, users!.password)
        if (!validPassword) return res.status(401).json({error:"incorrect password"})
        return res.status(200).json("Success");
    }catch (error){
        console.log(error)
        return res.status(401).json({error: "Email is incorrect"})
    }
  
});

export default router;