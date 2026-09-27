import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SigninForm from "./Client";
import { Aclonica } from "next/font/google";

export default async function Page() {
    const token = (await cookies()).get("session")?.value;

    if (!token) {
        return <SigninForm />;
    }

    redirect("/");
}