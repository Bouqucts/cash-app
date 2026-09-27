"use client"

import { FormEvent, useState } from "react";
import { login } from "@/actions/auth";

export default function SigninForm() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await login(email, password);
            if(!res.ok) return res.message;
            console.log(res.message);
        } finally {
            setEmail("");
            setPassword("");
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col w-full max-w-[390px]">
                <p className="font-sonder text-[#1783c1] text-[3rem] px-8 py-8">Artos</p>

                <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-3 justify-center items-center bg-[#1783c1] rounded-t-[2rem] px-8 py-16">
                    <p className="text-white text-[2rem] mb-4">Sign In</p>

                    <input
                        type="text"
                        placeholder="Email"
                        className="w-[259px] bg-white rounded-full px-5 py-3 focus:outline-[#333333]"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-[259px] bg-white rounded-full px-5 py-3 focus:outline-[#333333]"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required
                    />

                    <button type="submit" className="mt-auto bg-white w-[350] px-6 py-3 rounded-full">{loading ? "Loading..." : "Login"}</button>
                </form>
            </div>
    )
}