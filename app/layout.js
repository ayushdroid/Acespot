import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "Acespot - hnxvrtxx",
  description: "E-Commerce with Next.js ",
};

const themeInitScript = `(function() {
  try {
    // 1) Check saved user preference
    var theme = localStorage.getItem('theme');
    if (!theme) {
      // 2) If none, use system preference
      var m = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = m ? 'dark' : 'light';
    }
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (e) {
    console.warn('theme init error', e);
  }
})();`;

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" >
        <body className={`${outfit.className} antialiased text-gray-700`} >
          <Script id="theme-init" strategy="beforeInteractive">
            {themeInitScript}
          </Script>
          <Toaster />
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </body>
      </html>
      </ClerkProvider>
  );
}


