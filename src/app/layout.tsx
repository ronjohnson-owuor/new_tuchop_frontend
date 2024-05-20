import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Script from "next/script";


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
        {/* adsense analytics tag */}
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6391774391031351"
     crossOrigin="anonymous"></Script>
        {/* analytics tags for google analytics */}
            
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XRB5GW3YVD"></Script>
      <Script>
       {` window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-XRB5GW3YVD');`}
      </Script>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      </head>
      <body className="dark:bg-dBackground">     
         <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        </body>

    </html>
  );
}
