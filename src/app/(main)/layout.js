import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "LegalEase - Online Lawyer Hiring Platform",
  description:
    "Connect with expert legal counsel online through LegalEase. Browse lawyers, compare services, and hire trusted legal professionals.",
};

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="grow flex flex-col w-full">{children}</main>
      <Footer />
    </>
  );
}
