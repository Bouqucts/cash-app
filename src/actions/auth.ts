"use server";
import { hashPassword } from "@/lib/argon";
import pool from "@/lib/db";
import { signToken } from "@/lib/jwt";
import { usersTypes } from "@/lib/type";
import { cookies } from "next/headers";
import argon2 from 'argon2';

export const login = async (email:string, password: string) => {
    try {
        if (!email || !password) return {ok:false, message: "Fill the blank"};
        const res = await pool.query<usersTypes>("SELECT id, name, email, password, created_at, updated_at FROM users WHERE email=$1 LIMIT 1", [email]);
        if (res.rowCount === 0) return {ok: false, message: "NO ACCOUNT FOUND"};
        const user = res.rows[0];
        const id = user.id
        const name = user.name
        const userEmail = user.email
        const created_at = user.created_at
        const updated_at = user.updated_at
        const valid = await argon2.verify(user.password, password);
        if (userEmail !== email || !valid) return {ok:false, message: "Invalid email or password"};
        const payload = { id, name, email: userEmail, created_at, updated_at};
        const cookieStore = await cookies();
        const token = signToken(payload);
        cookieStore.set("session", token);
        return {ok:true, message: "Success",users:res.rows}
    } catch (e) {
        return {ok: false, message: e instanceof Error ? `ERROR: ${e.message}` : e}
    }
}

export const register = async (name:string, email: string, password: string) => {
    try {
        if (!name || !email || !password) return {ok:false, message: "Fill the blank"};
        const hash = await hashPassword(password);
        await pool.query<usersTypes>("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, hash]);
        return {ok: true, message: "Success"}
    }  catch (e) {
        return {ok: false, message: e instanceof Error ? `ERROR: ${e.message}` : e}
    }
}