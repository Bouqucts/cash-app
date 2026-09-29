"use client";

import { useState } from "react";
import {DollarSign, CreditCard, CircleDollarSign, ReceiptText, Settings} from "lucide-react";
import RecurringExpenses from "@/components/RecurringExpenses";
import Transactions from "@/components/Transactions";
import Debt from "@/components/Debt";
import History from "@/components/History";
import Setting from "@/components/Settings";
import InstallPWA from "@/components/InstallPWA";

export default function Home() {
  const [navigation, setNavigation] = useState<"1" | "2" | "3" | "4" | "5">("1");
  const navItems = [
    {icon: DollarSign, page: "1",},
    {icon: CreditCard, page: "2",},
    {icon: CircleDollarSign, page: "3",},
    {icon: ReceiptText, page: "4",},
    {icon: Settings, page: "5",},
  ] as const;
  const render = () => {
    switch (navigation) {
      case "1": return (<Transactions />);
      case "2": return (<RecurringExpenses />);
      case "3": return (<Debt />);
      case "4": return (<History />);
      case "5": return (<Setting />);
      default : return null;
    }
  }

  return (
    <>
      <nav className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
        <div className="flex h-[62px] w-full gap-1 items-center justify-between rounded-full bg-white px-3 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = navigation === item.page;
            return (
              <div key={item.page} className={`flex h-[48px] w-[48px] items-center justify-center rounded-full transition-all px-8 ${active ? "bg-gray-200" : "hover:bg-gray-100"}`}>
                <button type="button" onClick={()=>{setNavigation(item.page)}} className={`${active && "bg-[#333333] rounded p-1 text-gray-200"}`}>
                  <Icon size={28} strokeWidth={2.2}/>
                </button>
              </div>
            )
          })}
        </div>
      </nav>
      <main className="min-h-dvh w-full min-w-[330px] max-w-[425px]">
        {render()}
        <InstallPWA />
      </main>
    </>
  );
}