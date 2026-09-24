"use server";

import { cookies } from "next/headers";
import { transactionsProps } from "@/lib/type";
import { verifyToken } from "@/lib/jwt";
import pool from "@/lib/db";

export const selectTransactions = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return {ok:false, message: "Unauthorized"};
    const user = verifyToken(token);
    if (!user) return {ok:false, message: "Token tidak diketahui"};
    const userId = user.id;

    try {
        const res = await pool.query<transactionsProps>("SELECT t.* FROM transactions t INNER JOIN categories c ON t.category_id =c.id WHERE c.user_id=$1", [userId]);
        if (res.rows.length === 0) return {ok: false, message: "Transaction not found"};
        return {ok:true, message: "Success", transactions: res.rows}
    } catch (e) {
        return {ok: false, message: `SERVER ERROR: ${e instanceof Error ? e.message : e}`}
    }
}

export const insertTransactions = async (name: string, amount: number, type: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return {ok:false, message: "Unauthorized"};
    const user = verifyToken(token);
    if (!user) return {ok:false, message: "Token tidak diketahui"};
    const userId = user.id;

    try {
        const res = await pool.query("INSERT INTO transactions (category_id, name, amount, type) SELECT c.id, $1, $2, $3 FROM categories WHERE c.user_id=$4 RETURNING *", [name, amount, type, userId]);
        if (res.rows.length === 0) return {ok: false, message: "Transaction not found"};
        return {ok:true, message: "Success", transactions: res.rows}
    } catch (e) {
        return {ok: false, message: `SERVER ERROR: ${e instanceof Error ? e.message : e}`}
    }
}

export const updateTransactions = async (name: string, amount: number, type: string, id: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return {ok:false, message: "Unauthorized"};
    const user = verifyToken(token);
    if (!user) return {ok:false, message: "Token tidak diketahui"};
    const userId = user.id;

    try {
        const res = await pool.query("UPDATE transactions t SET name=$1, amount=$2, type=$3 FROM categories c WHERE t.id=$4, AND t.category_id=c.id AND c.user_id=$5 returning *", [name, amount, type, id, userId]);
        if (res.rows.length === 0) return {ok: false, message: "Transaction not found"};
        return {ok:true, message: "Success", transactions: res.rows}
    } catch (e) {
        return {ok: false, message: `SERVER ERROR: ${e instanceof Error ? e.message : e}`}
    }
}

export const deleteTransactions = async (id: string) => {
    try {
        if(!id) return {ok:false, message:"Can't find ID Transactions"};
        await pool.query("DELETE transactions WHERE id=$1", [id]);
        return {ok: true, message: "Success"};
    } catch (e) {
        return {ok: false, message: `SERVER ERROR: ${e instanceof Error ? e.message : e}`}
    }
}