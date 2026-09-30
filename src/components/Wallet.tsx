import { walletProps } from "@/lib/types"

interface Props {
    data: walletProps[],
}

export default function Wallet({data}: Props) {
    return (
        <>
            {data.map((items)=> (
                <div key={items.id} className="flex justify-between">
                    <div>
                        <p className="text-[2rem]">NT${items.balance}</p>
                        <p className="text-[0.8rem]">Saldo dalam IDR</p>
                    </div>
                    <div className="text-center bg-white rounded-2xl px-4 py-2">
                        <p className="text-[0.5rem] text-gray-400 border-b-1 border-gray-300">TWD &gt; IDR</p>
                        <p className="text-[0.8rem]">NT$ {" "}<span>1</span></p>
                        <p className="text-[0.8rem]">Rp {" "}<span>554</span></p>
                    </div>
                </div>
            ))}
        </>
    )
}