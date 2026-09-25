

"use client"

import { FormEvent, useState } from "react";
import { login } from "@/actions/auth";

export default function LoginForm() {
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
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email}/>
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password}/>
                <button type="submit">{loading ? "Loading..." : "Submit" }</button>
            </form>
        </div>
    )
}