import { ToastProvider } from "@/components/toast";

import { ProgressBarProvider } from "@/features/layout/progress-bar";

import "./globals.css";

export const metadata = {
  title: {
    template: "%s | Unsource",
    default: "Chat | Unsource",
  },
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, quae",
};

export default function RootLayout({ children }: WithChildren) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/itc7dtm.css" />
      </head>
      <body className="relative isolate flex min-h-[100svh] flex-col items-center bg-slate-50 px-2 py-6 before:absolute before:inset-0 before:-z-10 before:bg-[url('/img/bg-pattern.svg')] before:opacity-[0.06]">
        <ProgressBarProvider>
          <ToastProvider>{children}</ToastProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
