import jwt from "jsonwebtoken";
import { payloadProps } from "./type";

const secret = process.env.JWT_SECRET!;
if (!secret) throw new Error("JWT_SECRET is not defined");
export function signToken(payload: payloadProps) {
    return jwt.sign(
        payload,
        secret,
        { expiresIn: "1h" }
    );
}

export function verifyToken(token: string): payloadProps {
    return jwt.verify(token, secret,) as payloadProps;
}