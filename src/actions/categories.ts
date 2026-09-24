"use server";

import { cookies } from "next/headers";
import { categoriesProps } from "@/lib/type";
import { verifyToken } from "@/lib/jwt";
import pool from "@/lib/db";


export const selectCategories = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return {ok:false, message: "Unauthorized"};
    const user = verifyToken(token);
    if (!user) return {ok:false, message: "Token tidak diketahui"};
    const userId = user.id;

    try {
        const res = await pool.query<categoriesProps>("SELECT * FROM categories WHERE user_id=$1",[userId]);
        if (res.rows.length === 0) return {ok:false, message:"category_id not found"};
        return {ok:true, message: "Success", categories: res.rows}
    } catch (e) {
        return {ok: false, message: `SERVER ERROR: ${e instanceof Error ? e.message : e}`}
    }
}

export const insertCategories = async (name: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return {ok:false, message: "Unauthorized"};
    const user = verifyToken(token);
    if (!user) return {ok:false, message: "Token tidak diketahui"};
    const userId = user.id;

    try {
        await pool.query("INSERT INTO categories (user_id, name) VALUES ($1, $2)",[userId, name]);
        return {ok:true, message: "Success"}
    } catch (e) {
        return {ok: false, message: `SERVER ERROR: ${e instanceof Error ? e.message : e}`}
    }
}

export const updateCategories = async (name: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return {ok:false, message: "Unauthorized"};
    const user = verifyToken(token);
    if (!user) return {ok:false, message: "Token tidak diketahui"};
    const userId = user.id;

    try {
        await pool.query("UPDATE name=$2 FROM categories WHERE user_id=$1",[userId, name]);
        return {ok:true, message: "Success"}
    } catch (e) {
        return {ok: false, message: `SERVER ERROR: ${e instanceof Error ? e.message : e}`}
    }
}

export const deleteCategories = async (id: string) => {
    try {
        if (!id) return {ok:false, message: "categories not found"};
        await pool.query("DELETE FROM categories WHERE id=$1", [id]);
        return {ok: true, message: "Success"}
    } catch (e) {
        return {ok: false, message: `SERVER ERROR: ${e instanceof Error ? e.message : e}`}
    }
}