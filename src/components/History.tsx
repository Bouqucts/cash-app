"use client";

import { useEffect, useState } from "react";
import { debtProps } from "@/lib/types";
import { selectDebt } from "@/actions/debt";

export default function History() {
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
                <div>
                    {dataD.map(items => (
                        <div key={items.id}>
                            <h1>{items.name}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}