"use server";
import pool from "@/lib/db";

export const getUsers = async () => {
    const res = await pool.query("SELECT * FROM users");
    return {ok:true, users:res.rows};
}