import jwt from 'jsonwebtoken'

function jwtTokens({ id, name, email }: { id: number; name: string; email: string }) {
    const user = { id, name, email };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '2m' }) //15m
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '14d' }) //14 days
    return ({ accessToken, refreshToken })
}

//refresh tokens are being signed using the RSA512 algorithm using a 4096bit key.
// Algorithm.RSA512(rsaPublicKey, rsaPrivateKey)

//access tokens are being signed with a 1024 bit RSA key through the RSA256 algorithm.
// Algorithm.RSA256(rsaPublicKey, rsaPrivateKey)
//1h-1w?

export { jwtTokens }
