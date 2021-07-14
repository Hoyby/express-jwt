import jwt from 'jsonwebtoken'

function jwtTokens({ id, name, email }: { id: number; name: string; email: string }) {
    const user = { id, name, email };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '20s' }) //15m
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '20s' }) //14 days
    return ({ accessToken, refreshToken })
}

export { jwtTokens }