"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { login } from "@/actions/auth";
import { ArrowUpIcon } from "lucide-react";

export default function SigninForm() {
    const [face, setFace] = useState<"quote" | "login">("quote");
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await login(email, password);

            if (!res.ok) {
                console.log(res.message);
                return;
            }

            console.log(res.message);
        } finally {
            setEmail("");
            setPassword("");
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full max-w-[425px] overflow-hidden bg-white">
            <div className="flex min-h-screen flex-col items-center">
                <p className="self-start font-sonder text-[#1783c1] text-[3rem] px-8 py-8">Artos</p>
                <div className="mt-auto mb-8 text-center text-[2.2rem]">
                    <p>
                        Teu Gaduh{" "}
                        <span className="font-sonder text-[#1783c1]">
                            Artos
                        </span>
                        ?
                    </p>

                    <p>
                        Matak Nabung{" "}
                        <span className="font-aclonica text-red-500">
                            Kang
                        </span>
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setFace("login")}
                    className="mt-auto mb-8 flex w-[90%] cursor-pointer justify-center rounded-full bg-[#1783C1] py-4 text-white "
                >
                    <ArrowUpIcon/>
                </button>
            </div>

            <div
                className={` absolute bottom-0 left-0 z-20 flex h-[86.25%] w-full flex-col rounded-t-[2rem] bg-[#1783c1] px-8 pb-16 pt-2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${face === "login" ? "translate-y-0" : "translate-y-full"}`}
            >

                {/* Handle */}

                <button
                    type="button"
                    onClick={() => setFace("quote")}
                    className=" mx-auto w-[100px] cursor-pointer rounded-full bg-white p-1 "
                />

                <p className="mt-16 mb-4 text-center text-[2rem] text-white">
                    Sign In
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-1 flex-col items-center gap-3"
                >

                    <input
                        type="text"
                        placeholder="Email"
                        className=" w-[260px] rounded-full bg-white px-5 py-3 outline-none focus:outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className=" w-[260px] rounded-full bg-white px-5 py-3 outline-none focus:outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />

                    <p className="text-center text-white">
                        Doesn&apos;t have an account?{" "}
                        <Link
                            href="/signup"
                            className="hover:underline"
                        >
                            signup here
                        </Link>
                    </p>

                    <button
                        type="submit"
                        className="mt-auto w-[350px] cursor-pointer rounded-full bg-white px-6 py-3"
                    >
                        {loading ? "Loading..." : "Sign In"}
                    </button>

                </form>

            </div>

        </div>
    );
}