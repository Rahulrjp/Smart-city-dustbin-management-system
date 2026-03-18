import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sessionModel from '../models/SessionSchema.js';
import { getUserByEmail } from './db.services.js';

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export const verifyPassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

export const createAccessToken = ({ id, name, email, sessionId }) => {
    return jwt.sign({ id, name, email, sessionId }, process.env.JWT_SECRET, { expiresIn: 1000 * 60 * 15 });
}
export const createRefreshToken = ({ sessionId }) => {
    return jwt.sign({ sessionId }, process.env.JWT_SECRET, { expiresIn: 1000 * 60 * 60 * 24 * 7 });
}

export const verifyJwtToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

export const createSessionId = () => {
    return Math.random().toString(36).substring(2, 15);
}

export const createSession = async ({ sessionId, username, userAgent, ip }) => {
    const session = await sessionModel.create({ sessionId, username, userAgent, ip })
    return session;
}

export const findSessionById = async (sessionId) => {
    const session = await sessionModel.findOne({ sessionId })
    return session;
}

export const regenerateTokens = async (refreshToken) => {
    try {
        const decodedToken = verifyJwtToken(refreshToken)
        const currentSession = await findSessionById(decodedToken.sessionId)

        if (!currentSession || !currentSession.valid) {
            throw new Error("Invalid session")
        }

        const user = await getUserByEmail(currentSession.email);

        if (!user) throw new Error("Invalid user");

        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            sessionId: currentSession.sessionId,
        }

        const newAccessToken = createAccessToken(userData);
        const newRefreshToken = createRefreshToken({ sessionId: currentSession.sessionId });

        return { newAccessToken, newRefreshToken, user: userData }

    } catch (error) {
        console.error("Error generating tokens")
        return null;
    }
}


export const authenticateUser = async (req, res, user) => {

    const session = await sessionModel.create({
        sessionId: createSessionId(),
        email: user.email,
        userAgent: req.headers['user-agent'],
        ip: req.ip
    })
    const accessToken = createAccessToken({
        _id: user.id,
        name: user.name,
        email: user.email,
        sessionId: session.sessionId,
    });
    const refreshToken = createRefreshToken({ sessionId: session.sessionId });

    const baseConfig = {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    }

    res.cookie('access_token', accessToken, { ...baseConfig, maxAge: 1000 * 60 * 15 });
    res.cookie('refresh_token', refreshToken, { ...baseConfig, maxAge: 1000 * 60 * 60 * 24 * 7 });

    return accessToken;
}