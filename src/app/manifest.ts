import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Artos",
        short_name: "Artos",
        description: "Personal finance management application",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#1783C1",
        icons: [
            {
                src: "/icons/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}