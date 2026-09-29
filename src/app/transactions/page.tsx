"use client";

import { selectTransactions } from "@/actions/transactions";
import { transactionsProps } from "@/lib/types";
import { useEffect, useState } from "react";


export default function Page() {
    const [data, setData] = useState<transactionsProps[]>([])
    useEffect(()=> {
        const fetchData = async () => {
            const res = await selectTransactions();
            console.log(res.transactions);
            if(!res.ok || !res.transactions) return console.log(res.message);
            setData(res.transactions);
        }
        fetchData();
    }, []);
    return (
        <div>
            <p className="self-start font-sonder text-[#1783c1] text-[3rem] px-8 py-8">Artos</p>
            {data.map((item) => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <p>NTD: {item.amount}</p>
                    <p>{item.type ? item.type === "in" && "Income" : item.type === "out" && "Outcome"}</p>
                    <p>{new Date(item.created_at).toLocaleString("id-ID")}</p>
                </div>
            ))}
        </div>
    )
}