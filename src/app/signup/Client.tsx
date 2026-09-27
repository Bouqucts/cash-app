"use client";

import { register } from "@/actions/auth";
import { FormEvent, useState } from "react";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            await register(name, email, password);
        } finally {
            setLoading(false);
            setName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
        }
    };

    return (
        <div className="min-h-screen flex flex-col w-full max-w-[390px]">
            <p className="font-sonder text-[#1783c1] text-[3rem] px-8 py-8">Artos</p>
            <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-3 justify-center items-center bg-[#1783c1] rounded-t-[2rem] px-8 py-16">
                <p className="text-white text-[2rem] mb-4">Sign Up</p>
                <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="w-[259px] bg-white rounded-full px-5 py-3 focus:outline-[#333333]"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />
                <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-[259px] bg-white rounded-full px-5 py-3 focus:outline-[#333333]"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="w-[259px] bg-white rounded-full px-5 py-3 focus:outline-[#333333]"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />

                <input 
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    className="w-[259px] bg-white rounded-full px-5 py-3 focus:outline-[#333333]"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit" className="mt-auto bg-white w-[350] px-6 py-3 rounded-full">{loading ? "Loading..." : "Login"}</button>
            </form>
        </div>
    );
}