"use client"

import { getUsers } from "@/actions/auth";
import { usersTypes } from "@/lib/type";
import { useEffect, useState } from "react"

export default function Page() {
    const [data, setData] = useState<usersTypes[]>([]);
    useEffect(()=> {
        const fetchData = async () => {
            const res = await getUsers();
            if (!res.ok || !res.users) {return}
            setData(res.users);
            console.log(res.users);
        }
        fetchData();
    },[]);


    return (
        <div>
            {data.map(item => (
                <div key={item.id}>
                    <p>Nama: {item.name}</p>
                    <p>Email: {item.email}</p>
                </div>
            ))}
        </div>
    )
}