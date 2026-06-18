import "./globals.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Merriweather, Montserrat } from "next/font/google";
import { Toaster } from "sonner";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-header",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body", 
  display: "swap",
});

export const metadata = {
  title: "LegalEase - Online Lawyer Hiring Platform",
  description: "Connect with expert legal counsel online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body
        className={`${merriweather.variable} ${montserrat.variable} font-body min-h-full flex flex-col bg-background text-foreground`}
      >
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <Toaster richColors />
          <main className="grow">{children}</main>
        </NextThemesProvider>
      </body>
    </html>
  );
}
