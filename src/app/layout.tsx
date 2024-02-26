import DraftModeBanner from "@/components/DraftModeBanner";
import Heading from "@/components/Heading";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BallerBase",
  description: "Football Database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyClassName = clsx(
    inter.className,
    "flex min-h-screen flex-col gap-16"
  );

  return (
    <html lang="en">
      <body className={bodyClassName}>
        {draftMode().isEnabled && <DraftModeBanner />}
        <header className="container mx-auto p-8 border-b border-neutral-700">
          <Heading level={1}>
            <Link href="/">⚽️ BallerBase</Link>
          </Heading>
        </header>
        <main className="container mx-auto">{children}</main>
        <footer className="container mx-auto"></footer>
      </body>
    </html>
  );
}
