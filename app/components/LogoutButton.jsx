"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const logout = async () => {
        await fetch("/api/auth/logout", {
            method: "POST",
        });

        router.push("/"); // back to landing page
    };

    return (
        <button
            onClick={logout}
        >
            Logout
        </button>
    );
}
