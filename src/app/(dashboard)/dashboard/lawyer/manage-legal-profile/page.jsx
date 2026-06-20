"use client";

import React, { useState } from "react";
import AddServiceForm from "@/components/dashboard/LawyerDashboard/AddServiceForm";
import ServicesListTable from "@/components/dashboard/LawyerDashboard/ServicesListTable";

const INITIAL_MY_SERVICES = [
  {
    _id: "1",
    name: "Golam Saharier Omi",
    specialization: "Corporate & Business",
    fee: 2500,
    bio: "Corporate law expert handling corporate compliance, contract reviews, and business registration for startups.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    status: "Available",
    dateJoined: "2026-03-15",
  },
  {
    _id: "2",
    name: "Golam Saharier Omi",
    specialization: "Cyber & IT Law",
    fee: 3000,
    bio: "Specialized in data privacy litigation, digital forensic legal advice, and cybercrime defenses.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    status: "Busy",
    dateJoined: "2026-04-01",
  },
];

export default function ManageLegalProfile() {
  const [myServices, setMyServices] = useState(INITIAL_MY_SERVICES);

  return (
    <div className="w-full text-zinc-900 dark:text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pb-5 border-b border-zinc-200 dark:border-zinc-800 mb-6">
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">
            Manage Legal Services
          </h1>

          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            Create, edit, or delete your own legal services and profile
            listings.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <AddServiceForm onPublish={(data) => console.log(data)} />

        <ServicesListTable services={myServices} />
      </div>
    </div>
  );
}
