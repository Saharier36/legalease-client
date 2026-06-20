"use client";

import React, { useState } from "react";
import AddServiceForm from "@/components/dashboard/LawyerDashboard/AddServiceForm";
import ServicesListTable from "@/components/dashboard/LawyerDashboard/ServicesListTable";

export default function ManageLegalProfile() {
  const [refreshServices, setRefreshServices] = useState(0);

  const handleServicePublished = () => {
    setRefreshServices((value) => value + 1);
  };

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
        <AddServiceForm onPublish={handleServicePublished} />

        <ServicesListTable refreshKey={refreshServices} />
      </div>
    </div>
  );
}
