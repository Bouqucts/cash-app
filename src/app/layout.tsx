import type { Metadata } from "next";
import { Aclonica, Poppins } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100","200" ,"300","400", "500", "600", "700", "800", "900",],
  variable: "--font-poppins",
})

const aclonica = Aclonica({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-aclonica",
});

export const metadata: Metadata = {
  title: "Artos",
  description: "We are Artos a website for cashflow**Cash-Flow** is a personal finance management application that helps users record, manage, and monitor their financial activities in one place. Users can organize financial categories, track income and expenses, manage wallets, and monitor debts and receivables. The application is designed with a simple and structured interface, making it easier for users to understand, organize, and keep track of their financial situation.",
  manifest: "/manifest.webmanifest",

  icons: {
      icon: "/icons/icon-192x192.png",
      apple: "/icons/icon-192x192.png",
  },

  appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: "Artos",
  },
};
export const viewport = {
    themeColor: "#1783c1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={"h-full antialiased"}
    >
      <body className={`${aclonica.variable} ${poppins.variable} min-h-full flex flex-col items-center`}>
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
};