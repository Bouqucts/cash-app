"use client"
import { selectCategories } from '@/actions/categories';
import { selectDebt } from '@/actions/debt';
import { selectTransactions } from '@/actions/transactions';
import { selectWallet } from '@/actions/wallet';
import { categoriesProps, debtProps, transactionsProps, userProps, walletProps } from '@/lib/type';
import {useEffect, useState} from 'react';
import { Trash2 } from 'lucide-react';
import { selectUser } from '@/actions/user';

export default function Home() {
  const [dataC, setDataC] = useState<categoriesProps[]>([]);
  const [dataT, setDataT] = useState<transactionsProps[]>([]);
  const [dataD, setDataD] = useState<debtProps[]>([]);
  const [dataW, setDataW] = useState<walletProps[]>([]);
  const [user, setUser] = useState<userProps|null>(null);
  useEffect(()=> {
    const fetchData = async () => {
      const resC = await selectCategories();
      const resT = await selectTransactions();
      const resD = await selectDebt();
      const resW = await selectWallet();
      const user = await selectUser();
      if(!resC.ok || !resC.categories ) return resC.message;
      if(!resT.ok || !resT.transactions ) return resT.message;
      if(!resD.ok || !resD.debt ) return resD.message;
      if(!resW.ok || !resW.wallet ) return resW.message;
      if(!user.ok || !user.user ) return user.message;
      setDataC(resC.categories);
      setDataT(resT.transactions);
      setDataD(resD.debt);
      setDataW(resW.wallet);
      setUser(user.user);
    }

    fetchData();
  }, []);
  return (
      <main className="min-h-screen w-full bg-gray-100 px-4 py-8">
        <div className="mx-auto w-full max-w-[390px]">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">
              Homepage
            </h1>

            <div className="flex flex-col gap-6">
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

              {/* Wallet */}
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

            </div>
          </div>
        </div>
      </main>
  );
}
