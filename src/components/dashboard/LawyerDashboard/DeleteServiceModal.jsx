"use client";

import React, { useState } from "react";
import { AlertDialog, Button, Spinner } from "@heroui/react";
import { FaTrash, FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { toast } from "sonner";
import { deleteLawyerService } from "@/services/actions";

export default function DeleteServiceModal({ service, onRefresh }) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!service) return null;
  const serviceId = service._id?.$oid || service._id;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteLawyerService(serviceId);

      if (response?.error) {
        toast.error(response.message || "Failed to delete the service");
      } else {
        toast.success("Service deleted successfully!");
        if (typeof onRefresh === "function") {
          onRefresh();
        }
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>

      <AlertDialog.Trigger>
        <Button
          className="bg-danger/10 hover:bg-danger text-danger hover:text-zinc-950 p-2.5 min-w-0 rounded-none h-8 w-8 flex items-center justify-center transition-colors"
          title="Delete Service"
        >
          <FaTrash className="text-xs" />
        </Button>
      </AlertDialog.Trigger>

      {/* ✅ Backdrop > Container > Dialog */}
      <AlertDialog.Backdrop className="bg-black/50 backdrop-blur-sm">
        <AlertDialog.Container placement="center">
          <AlertDialog.Dialog className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-none shadow-lg overflow-hidden relative p-6 max-w-md w-full">
            {/* Close button */}
            <AlertDialog.CloseTrigger className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors p-1 inline-flex items-center justify-center cursor-pointer">
              <FaTimes size={14} />
            </AlertDialog.CloseTrigger>

            {/* Header */}
            <AlertDialog.Header className="flex items-start gap-4 pb-2">
              <div className="text-danger shrink-0 flex items-center justify-center">
                <FaExclamationTriangle size={20} />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight">
                  Delete Legal Service
                </h2>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                  This action is permanent and cannot be undone.
                </p>
              </div>
            </AlertDialog.Header>

            {/* Body */}
            <AlertDialog.Body className="py-4">
              <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900/60 p-3.5 rounded-none">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 font-semibold uppercase tracking-wider">
                  Service Name
                </p>
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 truncate">
                  {service.name || "Untitled Service"}
                </p>
                {service.specialization && (
                  <span className="inline-block mt-2 px-2 py-0.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium">
                    {service.specialization}
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed">
                Are you sure you want to permanently delete this service from
                your dashboard?
              </p>
            </AlertDialog.Body>

            {/* Footer */}
            <AlertDialog.Footer className="pt-4 border-t border-zinc-100 dark:border-zinc-900/60 flex items-center justify-end gap-3 w-full">
              <Button
                slot="close"
                type="button"
                isDisabled={isDeleting}
                className="bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium px-5 h-9 rounded-none text-sm transition-colors"
              >
                Keep Service
              </Button>

              <Button
                onClick={handleDelete}
                isDisabled={isDeleting}
                className="bg-danger text-white font-bold px-5 h-9 rounded-none hover:bg-danger/90 flex items-center justify-center gap-2 transition-all text-sm relative"
              >
                {isDeleting && (
                  <div className="absolute inset-0 flex items-center justify-center bg-danger">
                    <Spinner size="sm" color="current" />
                  </div>
                )}
                <span
                  className={`flex items-center gap-2 ${isDeleting ? "invisible" : ""}`}
                >
                  <FaTrash className="text-xs" /> Confirm Delete
                </span>
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
