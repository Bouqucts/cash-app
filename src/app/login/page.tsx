import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./Client";

export default async function Page() {
    const token = (await cookies()).get("session")?.value;

    if (!token) {
        return <LoginForm />;
    }

    redirect("/");
}