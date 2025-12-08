/// <reference path="../types/express/index.d.ts" />
import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = () => {

    return (req: Request, res: Response, next: NextFunction) => {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized : No token provided' });
        } else if (token.startsWith('Bearer')) {
            token = token.split(' ')[1];
        }

        const decodeJWT = jwt.verify(token as string, process.env.JWTSECRET as string);

        if (!decodeJWT) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.user = decodeJWT as JwtPayload;
        // console.log("Decoded jwt from auth.ts ::", decodeJWT);
        next();

    }
};


export default auth;