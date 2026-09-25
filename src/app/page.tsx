"use client"
import { selectCategories } from '@/actions/categories';
import { selectDebt } from '@/actions/debt';
import { selectTransactions } from '@/actions/transactions';
import { selectWallet } from '@/actions/wallet';
import { categoriesProps, debtProps, recurringExpensesProps, transactionsProps, userProps, walletProps } from '@/lib/types';
import {useEffect, useState} from 'react';
// import { Currency, Trash2 } from 'lucide-react';
import { selectUser } from '@/actions/user';
import { selectRecurringExpenses } from '@/actions/recurringExpenses';

export default function Home() {
  const [loading, setLoading] = useState(false); // Loading boolean
  const [dataC, setDataC] = useState<categoriesProps[]>([]); // Data  Kategori
  const [dataD, setDataD] = useState<debtProps[]>([]); // Data Debt
  const [dataRE, setDataRE] = useState<recurringExpensesProps[]>([]); // Data RecurringExpenses
  const [dataT, setDataT] = useState<transactionsProps[]>([]); // Data Transactions
  const [dataW, setDataW] = useState<walletProps[]>([]); // Data Wallet
  const [user, setUser] = useState<userProps|null>(null); // Data User
  useEffect(()=> {
    const fetchData = async () => {
      const resC = await selectCategories();
      const resD = await selectDebt();
      const resRE = await selectRecurringExpenses();
      const resT = await selectTransactions();
      const resW = await selectWallet();
      const user = await selectUser();
      if(!resC.ok || !resC.categories ) return resC.message;
      if(!resD.ok || !resD.debt ) return resD.message;
      if(!resRE.ok || !resRE.recurringExpenses ) return resRE.message;
      if(!resT.ok || !resT.transactions ) return resT.message;  
      if(!resW.ok || !resW.wallet ) return resW.message;
      if(!user.ok || !user.user ) return user.message;
      setDataC(resC.categories);
      setDataD(resD.debt);
      setDataRE(resRE.recurringExpenses);
      setDataT(resT.transactions);
      setDataW(resW.wallet);
      setUser(user.user);
    }

    fetchData();
  }, []);
  return (
      <main className="min-h-screen w-full bg-gray-100 px-4 py-8">
        <div className="mx-auto w-full max-w-[390px]">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h1 className="font-sonder mb-6 text-4xl font-bold text-gray-900">
              Artos
            </h1>
            <section>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
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
                    dataT.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-4 py-3">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-800">{item.name}</p>
                          <p className="mt-1 text-xs text-gray-400">Recurring expense</p>
                        </div>

                        <p className="shrink-0 text-sm font-semibold text-gray-900">
                          <span className="mr-1 text-xs font-medium text-gray-400">NT$</span>{item.amount.toLocaleString("en-US", {style: "currency", currency: "TWD"})}
                        </p>
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

            {/* <div className="flex flex-col gap-6">
              <section>
                <h2  className="mb-3 border-b border-gray-200 pb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">Profile</h2>
                <div className="space-y-1">
                  <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Nama:</span>{" "}{user?.name}</p>
                  <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Email:</span>{" "}{user?.email}</p>
                  <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Created:</span>{" "}{user?.created_at && new Date(user?.created_at).toLocaleString("id-ID")}</p>
                </div>
              </section>
              <section>
                <h3 className="mb-3 border-b border-gray-200 pb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">Data Categories</h3>
                <div className="space-y-1">
                  {dataC.map(item => (
                    <div key={item.id} className="rounded-lg bg-gray-50 px-3 py-2">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium text-gray-900">Nama:</span>{" "}{item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="mb-3 border-b border-gray-200 pb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">Data Transactions</h3>
                <div className="space-y-1">
                  {dataT.map(item => (
                    <div key={item.id} className="rounded-lg bg-gray-50 px-3 py-2">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium text-gray-900">Nama:</span>{" "}{item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="mb-3 border-b border-gray-200 pb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">Data Debt</h3>
                <div className="space-y-1">
                  {dataD.map(item => (
                    <div key={item.id} className="rounded-lg bg-gray-50 px-3 py-2">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium text-gray-900">Nama:</span>{" "}{item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="mb-3 border-b border-gray-200 pb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">Data Wallet</h3>
                <div className="space-y-2">
                  {dataW.map(item => (
                    <div key={item.id} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium text-gray-900">Nama:</span>{" "}{item.name}
                      </p>
                      <Trash2 className="h-4 w-4 cursor-pointer text-gray-400 transition hover:text-red-500" />
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <a href="/login" className="rounded py-2 px-3 bg-blue-500 hover:bg-blue-600 focus:outline-2 focus:outline-offset-2 focus:outline-blue-300 active:bg-blue-700">Login</a>
              </section>
            </div> */}
          </div>
        </div>
      </main>
  );
}
