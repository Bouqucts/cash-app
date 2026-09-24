"use server";

import { cookies } from "next/headers";
import { walletProps } from "@/lib/types";
import { verifyToken } from "@/lib/jwt";
import pool from "@/lib/db";

export const selectWallet = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return {ok: false, message: "Unauthorized"};
    const user = verifyToken(token);
    if (!user) return {ok: false, message: "Unknown Token"};
    const userId = user.id;

    try {
        const res = await pool.query<walletProps>("SELECT * FROM wallet WHERE user_id=$1", [userId]);
        if (res.rows.length === 0) return {ok: false, message: "Wallet not found"};
        return {ok:true, message: "Success", wallet: res.rows}
    } catch (e) {
        return {ok: false, message: `SERVER ERROR: ${e instanceof Error ? e.message : e}`}
    }
}

export const insertWallet = async (name: string, balance: number, type: boolean) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return {ok:false, message: "Unauthorized"};
    const user = verifyToken(token);
    if (!user) return {ok:false, message: "Unknown Token"};
    const userId = user.id;

    try {
        const res = await pool.query("INSERT INTO wallet (user_id, name, balance, type) VALUES ($1,$2,$3,$4)", [userId, name, balance, type]);
        if (res.rows.length === 0) return {ok: false, message: "Wallet not found"};
        return {ok:true, message: "Success", wallet: res.rows}
    } catch (e) {
        return {ok: false, message: `SERVER ERROR: ${e instanceof Error ? e.message : e}`}
    }
}

export const updateWallet = async (name: string, balance: number, type: string, id: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return {ok:false, message: "Unauthorized"};
    const user = verifyToken(token);
    if (!user) return {ok:false, message: "Unknown Token"};
    const userId = user.id;

    try {
        const res = await pool.query("UPDATE wallet (name=$1, balance=$2, type=$3 WHERE id=$4 AND user_id=$5)", [name, balance, type, id, userId]);
        if (res.rows.length === 0) return {ok: false, message: "Wallet not found"};
        return {ok:true, message: "Success", wallet: res.rows}
    } catch (e) {
        return {ok: false, message: `SERVER ERROR: ${e instanceof Error ? e.message : e}`}
    }
}

export const deleteWallet = async (id: string) => {
    try {
        if(!id) return {ok:false, message:"Can't find Wallet ID"};
        const res = await pool.query("DELETE wallet WHERE id=$1", [id]);
        if(res.rows.length === 0) return {ok:false, message: "Column Not Found"};
        return {ok: true, message: "Success"}
    } catch (e) {
        return {ok: false, message: `SERVER ERROR: ${e instanceof Error ? e.message : e}`}
    }
}