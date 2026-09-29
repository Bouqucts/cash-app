"use client";

import { useEffect } from "react";

export default function PWAInstallDebug() {
    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            console.log("🔥 PWA INSTALLABLE", event);
        };

        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt
        );

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            );
        };
    }, []);

    return null;
}