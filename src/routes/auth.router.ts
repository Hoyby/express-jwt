import express from "express";
import { getUser } from "../repositories/auth.repository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtTokens } from '../utils/jwt-helpers';

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getUser(email)
        //PASSWORD CHECK
        const validPassword = await bcrypt.compare(password, user!.password)
        if (!validPassword) return res.status(401).json({ error: "incorrect password" })
        //JWT
        let tokens = jwtTokens(user!)
        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true })
        res.json(tokens)

    } catch (error) {
        return res.status(401).json({ error: error.message })
    }

});

router.get('/refresh_token', (req, res) => {
    try {
        console.log("test");
        const refreshToken = req.cookies.refresh_token //?
        if (refreshToken === null) return res.status(401).json({ error: 'null refresh token' })
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (error: any, user: any) => {
            if (error) return res.status(403).json({ error: error.message })
            let tokens = jwtTokens(user)
            res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true })
            res.json(tokens)
        })
        return res.json(refreshToken);
    } catch (error) {
        return res.status(401).json({ error: error.message })
    }
})

export default router;