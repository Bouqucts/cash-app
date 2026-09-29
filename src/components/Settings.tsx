"use client";

import { useEffect, useState } from "react";
import { debtProps } from "@/lib/types";
import { selectDebt } from "@/actions/debt";
import { logout } from "@/actions/auth";

export default function Settings() {
    const [loading, setLoading] = useState(false);
    const [dataD, setDataD] = useState<debtProps[]>([]);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await selectDebt();
                if(!res.ok || !res.debt) return console.error(res.message);
                setDataD(res.debt);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    },[]);

    return (
        <div className="min-h-dvh w-full">
            <div className="flex flex-col gap-2 rounded-2xl bg-white p-5">
                <p className="self-start font-sonder text-[#1783c1] text-[3rem] px-8 pt-4">Artos</p>
                <section>
                    {loading ? (
                        <div className="py-8 text-center">
                            <p className="text-sm font-medium text-gray-500">Loading...</p>
                            <p className="mt-1 text-xs text-gray-400">Your recurring expenses will appear here.</p>
                        </div>
                    ) : dataD.length < 0 ?
                        dataD.map(items => (
                            <div key={items.id}>
                                <h1>{items.name}</h1>
                            </div>
                        )) : (
                            <div className="py-8 text-center">
                                <p className="text-sm font-medium text-gray-500">No recurring expenses</p>
                                <p className="mt-1 text-xs text-gray-400">Your recurring expenses will appear here.</p>
                            </div>
                        )
                    }
                </section>
                <section>
                    <button 
                        type="button" onClick={() => logout()}
                        className="bg-red-200 rounded px-4 py-2 cursor-pointer text-red-500 hover:bg-red-500 hover:text-red-200 transition"
                    >Logout</button>
                </section>
            </div>
        </div>
    )
}