import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode";
import { metadata } from "./metadata";
import { HomeIcon } from "lucide-react";
import TransitionLink from "./components/Transitionlink";
import Footer from "./components/Footer/page";
import Agent from "./components/Agent/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description"  content={metadata.description} />
        <link rel="icon" href={metadata.icons}/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="w-fit fixed top-1 right-16 z-40 hover:bg-grey-200 delay-300 transition-colors  border-2 border-black rounded-md dark:border-blue-500 mt-1">
            <ModeToggle />
          </div>
          <div className="fixed top-1 right-3 z-50  ">
            <div className="fixed top-1 right-3 z-50 border-2 border-black rounded-md dark:border-blue-500 mt-1 ">
              <TransitionLink href="/" label={<HomeIcon width={24} />} />
            </div>
          </div>
          <div className="absolute z-50 right-5 p-4 bottom-1  ">
          <Agent/>
          </div>
          {children}
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
