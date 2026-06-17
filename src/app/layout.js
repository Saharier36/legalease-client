import "./globals.css";

export const metadata = {
  title: "LegalEase - Online Lawyer Hiring Platform",
  description: "Connect with expert legal counsel online",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
