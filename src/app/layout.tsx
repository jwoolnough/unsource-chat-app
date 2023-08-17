import Image from "next/image";
import Link from "next/link";

import { ToastProvider } from "@/components/toast";

import "./globals.css";

export const metadata = {
  title: {
    template: "%s | Unsource",
    default: "Chat | Unsource",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/itc7dtm.css" />
      </head>
      <body className="relative isolate flex min-h-screen flex-col items-center bg-slate-50 p-6 before:absolute before:inset-0 before:-z-10 before:bg-[url('/img/bg-pattern.svg')] before:opacity-[0.06]">
        <ToastProvider>
          <header className="mb-auto flex">
            <Link href="/">
              <Image
                src="/img/logo.svg"
                alt="Unsource"
                width={177}
                height={18}
                priority
              />
            </Link>
          </header>

          {children}

          <footer className="mt-auto text-sm sm:flex">
            <p className="text-center">
              &copy; {new Date().getFullYear()} Unsource
            </p>
            <ul className="flex">
              <li className="sm:before:mx-3 sm:before:content-['·']">
                <Link href="/privacy" className="hover:text-orange-400">
                  Privacy Policy
                </Link>
              </li>
              <li className="before:mx-3 before:content-['·']">
                <Link
                  href="/terms-of-service"
                  className="hover:text-orange-400"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </footer>
        </ToastProvider>
      </body>
    </html>
  );
}
