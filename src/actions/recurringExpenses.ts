"use server"

import pool from "@/lib/db"
import { verifyToken } from "@/lib/jwt"
import { recurringExpensesProps } from "@/lib/types"
import { cookies } from "next/headers"

export const selectRecurringExpenses = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if(!token) return {ok: false, message: "Unauthorized"};
    const user = verifyToken(token);
    if(!user) return {ok:false, message: "Unknown Token"};
    const userId = user.id;
    try {
        const res = await pool.query<recurringExpensesProps>("SELECT * FROM recurring_expenses WHERE user_id=$1", [userId]);
        if(res.rows.length === 0) return {ok:false, message: "Column Not Found"};
        return {ok: true, message: "Success", recurringExpenses: res.rows}
    } catch (e) {
        return {ok:false, message: e instanceof Error ? `Error: ${e.message}` : e}
    }
}
export const insertRecurringExpenses = async (name: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if(!token) return {ok: false, message: "Unauthorized"};
    const user = verifyToken(token);
    if(!user) return {ok:false, message: "Unknown Token"};
    const userId = user.id;
    try {
        const res = await pool.query("INSERT INTO recurring_expenses (user_id, name) VALUES ($1, $2)", [userId, name]);
        if(res.rows.length === 0) return {ok:false, message: "Column Not Found"};
        return {ok: true, message: "Success", recurringExpenses: res.rows}
    } catch (e) {
        return {ok:false, message: e instanceof Error ? `Error: ${e.message}` : e}
    }
}
export const updateRecurringExpenses = async (id: string, name: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if(!token) return {ok: false, message: "Unauthorized"};
    const user = verifyToken(token);
    if(!user) return {ok:false, message: "Unknown Token"};
    const userId = user.id;
    try {
        const res = await pool.query<recurringExpensesProps>("UPDATE recurring_expenses SET name WHERE id=$1 AND user_id=$2", [id, userId, name]);
        if(res.rows.length === 0) return {ok:false, message: "Column Not Found"};
        return {ok: true, message: "Success", recurringExpenses: res.rows}
    } catch (e) {
        return {ok:false, message: e instanceof Error ? `Error: ${e.message}` : e}
    }
}

export const deleteRecurringExpenses = async (id: string) => {
    try {
        if (!id) return {ok:false, message: "Can't find expenses ID"};
        const res = await pool.query("DELETE recurring_expenses WHERE id=$1", [id]);
        if(res.rows.length === 0) return {ok:false, message: "Column Not Found"};
        return {ok:false, message: "Succes"}
    } catch (e) {
        return {ok:false, message: e instanceof Error ? `Error: ${e.message}` : e}
    }
}