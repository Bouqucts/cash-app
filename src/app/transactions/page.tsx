"use client";

import { selectTransactions } from "@/actions/transactions";
import { transactionsProps } from "@/lib/type";
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
            <h1>Transactions Page</h1>
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