"use client";

import { useEffect, useState } from "react";
import { recurringExpensesProps } from '@/lib/types';
import { selectRecurringExpenses } from "@/actions/recurringExpenses";

export default function RecurringExpenses() {
    const [loading, setLoading] = useState(false); // Loading boolean
    const [dataRE, setDataRE] = useState<recurringExpensesProps[]>([]); // Data RecurringExpenses

    useEffect(()=> {
        const fetchData = async () => {
            try {
                setLoading(true);
                const resRE = await selectRecurringExpenses();
                if(!resRE.ok || !resRE.recurringExpenses ) return resRE.message;
                setDataRE(resRE.recurringExpenses);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return(
        <div className="min-h-dvh w-full">
            <div className="flex flex-col gap-2 rounded-2xl bg-white p-5">
                <p className="self-start font-sonder text-[#1783c1] text-[3rem] px-8 pt-4">Artos</p>
                <section>
                    <p>Contoh Halaman 2</p>
                </section>
                <section>
                    <div className="flex justify-between items-center bg-[#F0F2F2] rounded-2xl px-[1rem] py-[1rem]">
                        <div>
                        <p className="text-[2rem]">NT$ 2.000</p>
                        <p className="text-[0.8rem] text-gray-600">IDR 1.000.000</p>
                        </div>
                        <div className="text-center bg-white rounded-2xl px-4 py-2">
                        <p className="text-[0.7rem] text-gray-400 border-b-1 border-gray-300 px-2">TWD &gt; IDR</p>
                        <p className="text-[1rem]">NT$ {" "}<span>1</span></p>
                        <p className="text-[1rem]">Rp {" "}<span>554</span></p>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="grid grid-cols-2 gap-2 justify-between text-center">
                        <p className="rounded-full bg-[#1783C1] text-white px-auto py-2">In</p>
                        <p className="rounded-full bg-[#1783C1] text-white px-auto py-2">Out</p>
                    </div>
                </section>
                <section>
                    <div className="flex flex-col rounded-3xl border border-4 border-gray-200 bg-white p-3 shadow-sm">
                        <div className="self-center w-[80px] border-1 border-gray-200"/>
                        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Recurring Expenses</h3>
                                <p className="mt-1 text-xs text-gray-500">Your recurring transaction expenses</p>
                            </div>

                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                {dataRE.length} items
                            </span>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {loading ? (
                                    <div className="py-8 text-center">
                                        <p className="text-sm font-medium text-gray-500">Loading...</p>
                                        <p className="mt-1 text-xs text-gray-400">Your recurring expenses will appear here.</p>
                                    </div>
                                ) : dataRE.length > 0 ? (
                                    dataRE.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between gap-4 py-2 border-b-2 border-gray-200">
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-gray-800">{item.name}</p>
                                                <p className="truncate text-sm font-medium text-gray-800">{item.name}</p>
                                            </div>

                                            <p className="shrink-0 text-sm font-semibold text-gray-900"></p>
                                        </div>
                                    ))) : (
                                    <div className="py-8 text-center">
                                        <p className="text-sm font-medium text-gray-500">No recurring expenses</p>
                                        <p className="mt-1 text-xs text-gray-400">Your recurring expenses will appear here.</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}