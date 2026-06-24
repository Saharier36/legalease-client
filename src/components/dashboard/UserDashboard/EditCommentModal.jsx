"use client";

import { useState } from "react";
import { Modal, Button } from "@heroui/react";
import { MdModeEdit } from "react-icons/md";

const MAX_CHARS = 200;

export default function EditCommentModal({ comment, onUpdate }) {
  const [text, setText] = useState(comment.text);
  const [loading, setLoading] = useState(false);
  const remaining = MAX_CHARS - text.length;

  const handleSave = async (close) => {
    if (!text.trim()) return;
    setLoading(true);
    const success = await onUpdate(comment._id, text.trim());
    setLoading(false);
    if (success) close();
  };

  return (
    <Modal>
      <Button
        className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 p-2.5 min-w-0 rounded-none h-8 w-8 flex items-center justify-center transition-colors"
        title="Edit Review"
      >
        <MdModeEdit className="text-sm" />
      </Button>

      <Modal.Backdrop className="backdrop-blur-sm">
        <Modal.Container>
          <Modal.Dialog className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-none shadow-lg p-2 max-w-md w-full">
            {({ close }) => (
              <>
                <Modal.CloseTrigger className="hover:text-red-500 transition-colors" />

                <Modal.Header className="flex items-center pt-6 pb-2 border-b border-zinc-100 dark:border-zinc-900 mx-2">
                  <Modal.Heading className="text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-white">
                    Edit Review
                  </Modal.Heading>
                </Modal.Header>

                <Modal.Body className="py-6 px-4 flex flex-col gap-3">
                  <textarea
                    value={text}
                    onChange={(e) => {
                      if (e.target.value.length <= MAX_CHARS) {
                        setText(e.target.value);
                      }
                    }}
                    rows={4}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-4 py-3 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:border-[#A3F367] transition-colors resize-none rounded-none"
                  />
                  <span
                    className={`text-[11px] font-medium ${
                      remaining <= 20
                        ? "text-red-400"
                        : "text-zinc-400 dark:text-zinc-500"
                    }`}
                  >
                    {remaining} characters remaining
                  </span>
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
                    Save Changes
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
