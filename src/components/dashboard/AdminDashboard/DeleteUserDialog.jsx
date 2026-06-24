"use client";

import { useState } from "react";
import { AlertDialog, Button, Spinner } from "@heroui/react";
import { FaTrash, FaExclamationTriangle, FaTimes } from "react-icons/fa";

export default function DeleteUserDialog({ user, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(user._id);
    setIsDeleting(false);
  };

  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        <Button
          className="bg-danger/10 hover:bg-danger text-danger hover:text-zinc-950 p-2.5 min-w-0 rounded-none h-8 w-8 flex items-center justify-center transition-colors"
          title="Delete User"
        >
          <FaTrash className="text-xs" />
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Backdrop className="bg-black/50 backdrop-blur-sm">
        <AlertDialog.Container placement="center">
          <AlertDialog.Dialog className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-none shadow-lg overflow-hidden relative p-6 max-w-md w-full">
            <AlertDialog.CloseTrigger className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors p-1 inline-flex items-center justify-center cursor-pointer">
              <FaTimes size={14} />
            </AlertDialog.CloseTrigger>

            <AlertDialog.Header className="flex items-start gap-4 pb-2">
              <div className="text-danger shrink-0">
                <FaExclamationTriangle size={20} />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight">
                  Delete User
                </h2>
                <p className="text-xs text-zinc-400 font-medium">
                  This action is permanent and cannot be undone.
                </p>
              </div>
            </AlertDialog.Header>

            <AlertDialog.Body className="py-4">
              <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900/60 p-3.5 rounded-none">
                <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1">
                  User
                </p>
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                  {user.name || "—"}
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">{user.email}</p>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed">
                Are you sure you want to permanently delete this user?
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer className="pt-4 border-t border-zinc-100 dark:border-zinc-900/60 flex items-center justify-end gap-3 w-full">
              <Button
                slot="close"
                isDisabled={isDeleting}
                className="bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium px-5 h-9 rounded-none text-sm transition-colors"
              >
                Cancel
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
