import express from "express";
import { getUser } from "../repositories/auth.repository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtTokens } from '../utils/jwt-helpers';

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        //get user by email
        const { email, password } = req.body;
        const user = await getUser(email)

        //check password
        const validPassword = await bcrypt.compare(password, user!.password)
        if (!validPassword) return res.status(401).json({ error: "incorrect password" })

        //respond with tokens
        let tokens = jwtTokens(user!)
        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true })
        res.json(tokens)

    } catch (error) {
        return res.status(401).json({ error: error.message })
    }

});

router.get('/refresh_token', (req, res) => {
    try {
        //get refreshToken from cookie
        const refreshToken = req.cookies.refresh_token
        if (refreshToken === null) return res.status(401).json({ error: 'null refresh token' })

        //verify refreshToken
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (error: any, user: any) => {
            if (error) return res.status(403).json({ error: error.message })

            //respond with new tokens
            let tokens = jwtTokens(user)
            res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true })
            res.json(tokens)
        })

    } catch (error) {
        return res.status(401).json({ error: error.message })
    }
})

export default router;