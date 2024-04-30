import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";


export const metadata: Metadata = {
  title: "tuchop AI",
  description: "study from the best AI.Get notes and revision materials from our website.sign up for free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  suppressHydrationWarning ={true}>
      <head>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      <link rel="icon" type="image/svg" href="../../public/logo.svg" />
      </head>
      <body className="dark:bg-dBackground">     
         <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        </body>

    </html>
  );
}
