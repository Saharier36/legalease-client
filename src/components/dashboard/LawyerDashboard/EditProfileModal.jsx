"use client";

import React, { useState } from "react";
import { Modal, Button, Input } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { uploadImageToImgBB } from "@/utils/uploadImage";
import { FaUser } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { toast } from "sonner";

export default function EditProfileModal({ user, onSuccess }) {
  const [name, setName] = useState(user?.name || "");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (close) => {
    if (!name.trim()) {
      toast.error("Name field cannot be empty!");
      return;
    }

    setIsLoading(true);
    let uploadedImageUrl = user?.image;

    try {
      if (imageFile) {
        toast.loading("Uploading new avatar to ImgBB...", { id: "upload" });
        const resUrl = await uploadImageToImgBB(imageFile);

        if (!resUrl) {
          toast.dismiss("upload");
          toast.error("Failed to upload image. Try again!");
          setIsLoading(false);
          return;
        }
        uploadedImageUrl = resUrl;
        toast.success("Avatar uploaded!", { id: "upload" });
      }

      const { error } = await authClient.updateUser({
        name,
        image: uploadedImageUrl,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Profile updated successfully!");
      onSuccess?.();
      close();
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal>
      <Button
        size="sm"
        variant="light"
        className="rounded-none uppercase text-[11px] font-black tracking-widest text-zinc-400 hover:text-[#A3F367] bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all px-3 h-8 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 flex items-center gap-1.5"
      >
        <MdModeEdit size={14} style={{ color: "#A3F367" }} />
        <span>Edit Profile</span>
      </Button>

      <Modal.Backdrop className="backdrop-blur-sm">
        <Modal.Container>
          <Modal.Dialog className="bg-background border border-zinc-200 dark:border-zinc-800 rounded-none shadow-2xl p-2 max-w-md w-full">
            {({ close }) => (
              <>
                <Modal.CloseTrigger className="hover:text-red-500 transition-colors" />

                <Modal.Header className="flex items-center pt-6 pb-2 border-b border-zinc-100 dark:border-zinc-900 mx-2">
                  <Modal.Heading className="text-sm font-black uppercase tracking-widest text-foreground">
                    Update Profile Details
                  </Modal.Heading>
                </Modal.Header>

                <Modal.Body className="gap-5 py-6 px-4 flex flex-col">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="font-black uppercase tracking-wider text-[10px] text-zinc-500 dark:text-zinc-400">
                      Display Name
                    </label>
                    <div className="relative flex items-center w-full">
                      <span className="absolute left-3 z-10 text-zinc-400">
                        <FaUser size={12} />
                      </span>
                      <Input
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-content2/40 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 focus-within:border-[#A3F367]! rounded-none p-2 pl-9 text-sm focus:outline-none transition-colors text-foreground"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 w-full">
                    <label className="font-black uppercase tracking-wider text-[10px] text-zinc-500 dark:text-zinc-400">
                      Update Profile Photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      className="w-full bg-content2/40 border border-zinc-200 dark:border-zinc-800 text-sm p-1.5 rounded-none file:bg-[#A3F367] file:text-zinc-950 file:border-none file:px-3 file:py-1 file:font-bold file:mr-3 file:cursor-pointer file:text-xs file:uppercase file:tracking-wider focus:outline-none focus:border-[#A3F367]/50 text-zinc-400"
                    />
                    {user?.image && !imageFile && (
                      <p className="text-[10px] text-zinc-500 italic mt-1">
                        Current avatar will be kept if no new image is chosen.
                      </p>
                    )}
                  </div>
                </Modal.Body>

                <Modal.Footer className="border-t border-zinc-100 dark:border-zinc-900 pt-4 pb-2 mx-2">
                  <Button
                    variant="flat"
                    radius="none"
                    onPress={close}
                    isDisabled={isLoading}
                    className="rounded-none uppercase text-xs font-black tracking-wider bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 h-9 px-5"
                  >
                    Cancel
                  </Button>

                  <Button
                    onPress={() => handleSave(close)}
                    isLoading={isLoading}
                    radius="none"
                    className="rounded-none uppercase text-xs font-black tracking-wider h-9 px-6 transition-all shadow-md active:scale-95"
                    style={{ backgroundColor: "#A3F367", color: "#000000" }}
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
