"use client";

import { useState } from "react";
import { Modal, Button } from "@heroui/react";
import { MdOutlineGavel } from "react-icons/md";

const roles = ["user", "lawyer", "admin"];

export default function ChangeRoleModal({ user, onRoleChange }) {
  const [selectedRole, setSelectedRole] = useState(user.role || "user");
  const [loading, setLoading] = useState(false);

  const handleSave = async (close) => {
    if (selectedRole === user.role) {
      close();
      return;
    }
    setLoading(true);
    const success = await onRoleChange(user._id, selectedRole);
    setLoading(false);
    if (success) close();
  };

  return (
    <Modal>
      <Button
        className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 text-[10px] font-black uppercase tracking-wider px-3 rounded-none h-8 transition-colors"
        title="Change Role"
      >
        <MdOutlineGavel size={12} />
        Change Role
      </Button>

      <Modal.Backdrop className="backdrop-blur-sm">
        <Modal.Container>
          <Modal.Dialog className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-none shadow-lg p-2 max-w-sm w-full">
            {({ close }) => (
              <>
                <Modal.CloseTrigger className="hover:text-red-500 transition-colors" />

                <Modal.Header className="flex items-center pt-6 pb-2 border-b border-zinc-100 dark:border-zinc-900 mx-2">
                  <Modal.Heading className="text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-white">
                    Change Role
                  </Modal.Heading>
                </Modal.Header>

                <Modal.Body className="py-6 px-4 flex flex-col gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">
                      User
                    </p>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-zinc-400">{user.email}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Select Role
                    </p>
                    {roles.map((role) => (
                      <button
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider border transition-all rounded-none ${
                          selectedRole === role
                            ? "border-[#A3F367] bg-[#A3F367]/10 text-[#6dcf45]"
                            : "border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </Modal.Body>

                <Modal.Footer className="border-t border-zinc-100 dark:border-zinc-900 pt-4 pb-2 mx-2 flex items-center justify-end gap-3">
                  <Button
                    variant="flat"
                    radius="none"
                    onPress={close}
                    isDisabled={loading}
                    className="rounded-none uppercase text-xs font-black tracking-wider bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 h-9 px-5"
                  >
                    Cancel
                  </Button>
                  <Button
                    onPress={() => handleSave(close)}
                    isLoading={loading}
                    radius="none"
                    className="rounded-none uppercase text-xs font-black tracking-wider h-9 px-6 bg-[#A3F367] text-zinc-950"
                  >
                    Save
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
