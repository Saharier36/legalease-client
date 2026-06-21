"use client";

import { Modal } from "@heroui/react";
import { HiUser, HiBriefcase } from "react-icons/hi";

export default function RoleModal({ isOpen, isSubmitting, onSelectRole }) {
  return (
    <Modal isOpen={isOpen} isDismissable={false} hideCloseButton>
      <Modal.Backdrop className="bg-black/60 backdrop-blur-md dark:bg-black/80">
        <Modal.Container className="flex items-center justify-center p-4">
          <Modal.Dialog className="bg-white dark:bg-zinc-950/90 border border-black/10 dark:border-white/10 rounded-none w-full max-w-md p-6 shadow-2xl relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-[#A3F367]">
            <Modal.Header className="text-center flex flex-col items-center gap-1 pt-4">
              <Modal.Heading className="font-header text-2xl font-extrabold tracking-wide text-zinc-900 dark:text-white">
                Legal<span className="text-[#A3F367]">Ease</span>
              </Modal.Heading>
              <p className="text-xs text-zinc-500 dark:text-slate-400 font-light mt-1">
                Complete your profile by choosing a role
              </p>
            </Modal.Header>

            <Modal.Body className="py-6 flex flex-col gap-4">
              {/* User/Client Option */}
              <button
                disabled={isSubmitting}
                onClick={() => onSelectRole("user")}
                className="w-full text-left p-4 bg-zinc-100/80 dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-[#A3F367]/50 hover:bg-zinc-200/60 dark:hover:bg-white/10 transition-all duration-200 flex items-center gap-4 group"
              >
                <div className="p-3 bg-zinc-200/60 dark:bg-white/5 text-zinc-500 dark:text-slate-400 group-hover:text-[#A3F367] group-hover:bg-[#A3F367]/10 transition-colors">
                  <HiUser className="size-6" />
                </div>
                <div>
                  <h4 className="text-zinc-900 dark:text-white font-bold text-sm">
                    Join as a Client
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-slate-400 font-light mt-0.5">
                    I am looking for legal help and consultancy
                  </p>
                </div>
              </button>

              {/* Lawyer Option */}
              <button
                disabled={isSubmitting}
                onClick={() => onSelectRole("lawyer")}
                className="w-full text-left p-4 bg-zinc-100/80 dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-[#A3F367]/50 hover:bg-zinc-200/60 dark:hover:bg-white/10 transition-all duration-200 flex items-center gap-4 group"
              >
                <div className="p-3 bg-zinc-200/60 dark:bg-white/5 text-zinc-500 dark:text-slate-400 group-hover:text-[#A3F367] group-hover:bg-[#A3F367]/10 transition-colors">
                  <HiBriefcase className="size-6" />
                </div>
                <div>
                  <h4 className="text-zinc-900 dark:text-white font-bold text-sm">
                    Join as a Lawyer
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-slate-400 font-light mt-0.5">
                    I want to offer my professional legal services
                  </p>
                </div>
              </button>
            </Modal.Body>

            <Modal.Footer className="justify-center pb-2">
              <p className="text-[10px] text-zinc-400 dark:text-slate-500 font-light">
                This selection is permanent and customizes your platform
                experience.
              </p>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
