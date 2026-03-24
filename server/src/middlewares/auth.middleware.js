import { regenerateTokens, verifyJwtToken } from "../services/auth.services.js";

export const verifyAuthentication = async (req, res, next) => {
    const accessToken = req.cookies.access_token
    const refreshToken = req.cookies.refresh_token
    req.user = null;

    console.log("Middleware is running");

    if (!accessToken && !refreshToken) {
        return next();
    }
    if (accessToken) {
        const decodedToken = verifyJwtToken(accessToken)
        console.log("Decoded token from access token: ", decodedToken);
        req.user = decodedToken;
        return next();
    }
    if (refreshToken) {
        const { newAccessToken, newRefreshToken, user } = await regenerateTokens(refreshToken);

        req.user = user;

        const baseConfig = {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }
        res.cookie('access_token', newAccessToken, { ...baseConfig, maxAge: 1000 * 60 * 15 });
        res.cookie('refresh_token', newRefreshToken, { ...baseConfig, maxAge: 1000 * 60 * 60 * 24 * 7 });
    }

    return next();
}