import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const metadata = {
  title: "LegalEase - Online Lawyer Hiring Platform",
  description: "Connect with expert legal counsel online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <Navbar />
          <main>{children}</main>
        </NextThemesProvider>
      </body>
    </html>
  );
}
