"use client";

import { Modal, Button } from "@heroui/react";
import { MdOutlineGavel } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";

export default function HireModal({
  isOpen,
  onClose,
  onConfirm,
  lawyer,
  isLoading,
}) {
  const isBusy =
    lawyer?.status?.toLowerCase() === "busy" ||
    lawyer?.status?.toLowerCase() === "unavailable";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="rounded-none border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 max-w-md w-full mx-4">
            <Modal.CloseTrigger
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            />

            <Modal.Header className="border-b border-zinc-100 dark:border-zinc-800 px-6 pt-6 pb-4">
              <Modal.Icon className="mb-3">
                <div className="w-10 h-10 bg-[#A3F367]/10 border border-[#A3F367]/30 flex items-center justify-center">
                  <MdOutlineGavel className="text-[#A3F367] text-lg" />
                </div>
              </Modal.Icon>
              <Modal.Heading className="text-base font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                Confirm Hiring Request
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="px-6 py-5 space-y-4">
              {isBusy ? (
                <div className="border border-dashed border-red-500/30 bg-red-500/5 p-4">
                  <p className="text-sm font-bold text-red-500 uppercase tracking-wider">
                    Lawyer Unavailable
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    {lawyer?.name} is currently busy and cannot accept new
                    clients.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4 border border-zinc-100 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-950">
                    <div>
                      <p className="text-sm font-bold text-zinc-900 dark:text-white">
                        {lawyer?.name}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {lawyer?.specialization}
                      </p>
                    </div>
                    <div className="ml-auto flex items-baseline gap-0.5">
                      <FaDollarSign
                        size={10}
                        className="text-[#A3F367] mb-px"
                      />
                      <span className="text-lg font-black text-zinc-900 dark:text-white">
                        {lawyer?.fee}
                      </span>
                      <span className="text-[10px] text-zinc-400">/hr</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    You are about to send a hiring request to this lawyer.
                    Payment will be handled separately after confirmation.
                  </p>
                </>
              )}
            </Modal.Body>

            <Modal.Footer className="border-t border-zinc-100 dark:border-zinc-800 px-6 py-4 flex gap-3 justify-end">
              <Button
                onClick={onClose}
                className="rounded-none border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-600 dark:text-zinc-400 hover:border-zinc-500 text-xs font-bold uppercase tracking-wider px-4 py-2"
              >
                Cancel
              </Button>

              {!isBusy && (
                <Button
                  onClick={onConfirm}
                  isLoading={isLoading}
                  className="rounded-none bg-[#A3F367] hover:bg-[#b5fa82] text-zinc-950 font-black text-xs uppercase tracking-wider px-5 py-2"
                >
                  Confirm Hire
                </Button>
              )}
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
