import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Artos",
  description: "We are Artos a website for cashflow**Cash-Flow** is a personal finance management application that helps users record, manage, and monitor their financial activities in one place. Users can organize financial categories, track income and expenses, manage wallets, and monitor debts and receivables. The application is designed with a simple and structured interface, making it easier for users to understand, organize, and keep track of their financial situation.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={"h-full antialiased"}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}