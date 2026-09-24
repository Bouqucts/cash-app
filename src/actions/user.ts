"use server";

import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers"

export const selectUser = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if(!token) return {ok:false, message:"Unauthorized"};
    const user = verifyToken(token);
    try {
        if(!user) return {ok:false, message: "No User"};
        return {ok:true, message: "Success", user}
    } catch (e) {
        return {ok:false, message: e instanceof Error ? `User Error: ${e.message}` : e}
    }
}