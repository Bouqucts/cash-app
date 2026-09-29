"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
    useEffect(() => {
        if (!("serviceWorker" in navigator)) {
            return;
        }

        const registerServiceWorker = async () => {
            try {
                const registration =
                    await navigator.serviceWorker.register("/sw.js", {
                        scope: "/",
                    });

                console.log(
                    "[Artos] Service Worker registered:",
                    registration.scope
                );
            } catch (error) {
                console.error(
                    "[Artos] Service Worker registration failed:",
                    error
                );
            }
        };

        registerServiceWorker();
    }, []);

    return null;
}