"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
}

export default function InstallPWA() {
    const [installPrompt, setInstallPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);

    const [installed, setInstalled] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();

            setInstallPrompt(
                event as BeforeInstallPromptEvent
            );
        };

        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt
        );

        window.addEventListener("appinstalled", () => {
            setInstalled(true);
            setInstallPrompt(null);
        });

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            );
        };
    }, []);

    const handleInstall = async () => {
        if (!installPrompt) return;

        await installPrompt.prompt();

        const result = await installPrompt.userChoice;

        console.log("Install result:", result.outcome);

        setInstallPrompt(null);
    };

    if (installed || !installPrompt) {
        return null;
    }

    return (
        <button
            type="button"
            onClick={handleInstall}
            className="rounded-full bg-[#1783c1] px-6 py-3 text-white"
        >
            Install Artos
        </button>
    );
}