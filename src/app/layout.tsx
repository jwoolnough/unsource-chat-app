import Link from "next/link";
import "./globals.css";
import Image from "next/image";

export const metadata = {
  title: "Chat | Unsource",
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
      <body className="relative flex isolate flex-col items-center h-screen p-6 bg-slate-50 before:bg-[url('/img/bg-pattern.svg')] before:-z-10 before:opacity-[0.06] before:absolute before:inset-0">
        <header className="flex mb-auto">
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
        <div className="bg-white my-6 p-6 rounded-xl w-full max-w-sm">
          {children}
        </div>
        <footer className="mt-auto sm:flex text-sm">
          <p className="text-center">
            &copy; {new Date().getFullYear()} Unsource
          </p>
          <ul className="flex">
            <li className="sm:before:content-['·'] sm:before:mx-3">
              <Link href="/privacy" className="hover:text-orange-400">
                Privacy Policy
              </Link>
            </li>
            <li className="before:content-['·'] before:mx-3">
              <Link href="/terms-of-service" className="hover:text-orange-400">
                Terms of Service
              </Link>
            </li>
          </ul>
        </footer>
      </body>
    </html>
  );
}
