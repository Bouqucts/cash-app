"use client";

import { useEffect, useState } from "react";
import { transactionsProps, walletProps} from '@/lib/types';
import { selectTransactions } from "@/actions/transactions";
import Analytics from "./Analytics";
import IncomeTransactions from "./IncomeTransactions";
import OutcomeTransactions from "./OutcomeTransactions";
import Wallet from "./Wallet";
import { selectWallet } from "@/actions/wallet";

export default function Transactions() {
    const [loading, setLoading] = useState(false); // Loading boolean
    const [dataRender, setRender] = useState<"in" | "out">("in"); // Data Render
    const [dataT, setDataT] = useState<transactionsProps[]>([]); // Data RecurringExpenses
    const [dataW, setDataW] = useState<walletProps[]>([]); // Data RecurringExpenses

    useEffect(()=> {
        const fetchData = async () => {
            try {
                setLoading(true);
                const resT = await selectTransactions();
                const resW = await selectWallet();
                if(!resT.ok || !resT.transactions ) return resT.message;
                if(!resW.ok || !resW.wallet ) return resW.message;
                setDataT(resT.transactions);
                setDataW(resW.wallet);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const render = () => {
        switch (dataRender) {
            case "in": 
                return (
                    <IncomeTransactions data={dataT}/>
                )
            case "out": 
                return (
                    <OutcomeTransactions data={dataT}/>
                )
        }
    }

    return(
        <div className="min-h-dvh w-full">
            <div className="flex flex-col gap-2 rounded-2xl bg-white p-5">
                <p className="self-start font-sonder text-[#1783c1] text-[3rem] px-8 pt-4">Artos</p>
                <section>
                    
                        {loading === true ? (
                                <div className="flex justify-between items-center bg-[#F0F2F2] rounded-2xl px-[1rem] py-[1rem]">
                                    <div>
                                        <p className="text-[2rem]">Saldo Loading...</p>
                                        <p className="text-[0.8rem]">Saldo Loading...</p>
                                    </div>
                                    <div className="text-center bg-white rounded-2xl px-4 py-2">
                                        <p className="text-[0.5rem] text-gray-400 border-b-1 border-gray-300">NT$ &gt; IDR</p>
                                        <p className="text-[0.8rem]">Loading...</p>
                                        <p className="text-[0.8rem]">Loading...</p>
                                    </div>
                                </div>
                            ) : dataT.length > 0 ? (
                                <div className="items-center bg-[#F0F2F2] rounded-2xl px-[1rem] py-[1rem]">
                                    <Wallet data={dataW}/>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center bg-[#F0F2F2] rounded-2xl px-[1rem] py-[1rem]">
                                    <div>
                                        <p className="text-[2rem]">404</p>
                                        <p className="text-[0.8rem]">404</p>
                                    </div>
                                    <div className="text-center bg-white rounded-2xl px-4 py-2">
                                        <p className="text-[0.5rem] text-gray-400 border-b-1 border-gray-300">NT$ &gt; IDR</p>
                                        <p className="text-[0.8rem]">404</p>
                                        <p className="text-[0.8rem]">404</p>
                                    </div>
                                </div>
                            )
                        }
                </section>
                <section>
                    <div className="grid grid-cols-2 gap-2 justify-between text-center">
                        <button type="button" onClick={()=> setRender("in")} className="cursor-pointer rounded-full bg-[#1783C1] text-white px-auto py-2">In</button>
                        <button type="button" onClick={()=> setRender("out")} className="cursor-pointer rounded-full bg-[#1783C1] text-white px-auto py-2">Out</button>
                    </div>
                </section>
                <section>
                    <div className="flex flex-col rounded-3xl border-4 border-gray-200 bg-white p-4">
                        <div className="self-center w-[80px] border-1 border-gray-200"/>
                        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Recurring Expenses</h3>
                                <p className="mt-1 text-xs text-gray-500">Your recurring transaction expenses</p>
                            </div>

                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                {dataT.length} items
                            </span>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {loading === true ? (
                                    <div className="py-8 text-center">
                                        <p className="text-sm font-medium text-gray-500">Loading...</p>
                                        <p className="mt-1 text-xs text-gray-400">Your recurring expenses will appear here.</p>
                                    </div>
                                ) : dataT.length > 0 ? (
                                    render()
                                ) : (
                                    <div className="py-8 text-center">
                                        <p className="text-sm font-medium text-gray-500">No recurring expenses</p>
                                        <p className="mt-1 text-xs text-gray-400">Your recurring expenses will appear here.</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <Analytics/>
                </section>
            </div>
        </div>
    )
}