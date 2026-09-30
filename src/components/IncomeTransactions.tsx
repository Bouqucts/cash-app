import { transactionsProps } from "@/lib/types";

interface Props {
    data: transactionsProps[],
}

export default function IncomeTransactions({data}: Props) {
    return (
        <div>
            {data.map((item) => ( item.type === "in" && (
                <div key={item.id} className="flex items-center justify-between gap-4 py-2 border-b-2 border-gray-200">
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-800">{item.name}</p>
                    </div>

                    <p className="shrink-0 text-sm font-semibold text-gray-900">
                    <span className="mr-1 text-xs font-medium text-gray-400">NT$</span>{item.amount.toLocaleString("en-US", {style: "currency", currency: "TWD"})}
                    </p>
                </div>
            )
            ))}
        </div>
    )
}