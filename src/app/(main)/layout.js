import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="grow flex flex-col w-full">{children}</main>
      <Footer />
    </>
  );
}
