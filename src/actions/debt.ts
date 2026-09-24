"use server";

import { cookies } from "next/headers";
import { debtProps } from "@/lib/type";
import { verifyToken } from "@/lib/jwt";
import pool from "@/lib/db";

export const selectDebt = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return {ok: false, message: "Unauthorized"};
    const user = verifyToken(token);
    if (!user) return {ok: false, message: "Token tidak diketahui"};
    const userId = user.id;

    try {
        const res = await pool.query<debtProps>("SELECT * FROM debt WHERE user_id=$1", [userId]);
        if (res.rows.length === 0) return {ok: false, message: "Debt not found"};
        return {ok:true, message: "Success", debt: res.rows}
    } catch (e) {
        return {ok: false, message: `SERVER ERROR: ${e instanceof Error ? e.message : e}`}
    }
}

export const insertDebt = async (name: string, duedate: number, notification: boolean) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return {ok:false, message: "Unauthorized"};
    const user = verifyToken(token);
    if (!user) return {ok:false, message: "Token tidak diketahui"};
    const userId = user.id;

    try {
        const res = await pool.query("INSERT INTO debt (user_id, name, duedate, notification) VALUES ($1,$2,$3,$4)", [userId, name, duedate, notification]);
        if (res.rows.length === 0) return {ok: false, message: "Debt not found"};
        return {ok:true, message: "Success", debt: res.rows}
    } catch (e) {
        return {ok: false, message: `SERVER ERROR: ${e instanceof Error ? e.message : e}`}
    }
}

export const updateDebt = async (name: string, duedate: number, notification: string, id: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return {ok:false, message: "Unauthorized"};
    const user = verifyToken(token);
    if (!user) return {ok:false, message: "Token tidak diketahui"};
    const userId = user.id;

    try {
        const res = await pool.query("UPDATE debt (name=$1, duedate=$2, notification=$3 WHERE id=$4 AND user_id=$5)", [name, duedate, notification, id, userId]);
        if (res.rows.length === 0) return {ok: false, message: "Debt not found"};
        return {ok:true, message: "Success", debt: res.rows}
    } catch (e) {
        return {ok: false, message: `SERVER ERROR: ${e instanceof Error ? e.message : e}`}
    }
}

export const deleteDebt = async (id: string) => {
    try {
        if(!id) return {ok:false, message:"Can't find ID Transactions"};
        await pool.query("DELETE debt WHERE id=$1", [id]);
        return {ok: true, message: "Success"};
    } catch (e) {
        return {ok: false, message: `SERVER ERROR: ${e instanceof Error ? e.message : e}`}
    }
}