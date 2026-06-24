"use client";

import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { uploadImageToImgBB } from "@/utils/uploadImage";
import { FaUser } from "react-icons/fa";
import { MdModeEdit, MdOutlineGavel } from "react-icons/md";
import { toast } from "sonner";
import Image from "next/image";
import { useUserSession } from "@/core/session-client";

export default function UpdateProfile() {
  const { user } = useUserSession();
  const [name, setName] = useState(user?.name || "");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name field cannot be empty!");
      return;
    }

    setIsLoading(true);
    let uploadedImageUrl = user?.image;

    try {
      if (imageFile) {
        toast.loading("Uploading avatar...", { id: "upload" });
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
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5 mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
            Update Profile
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">
            Update your display name and profile photo.
          </p>
        </div>

        <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <div className="h-1 w-full bg-[#A3F367]" />

          <div className="p-8 flex flex-col gap-6">
            {/* Avatar preview */}
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 shrink-0 border-2 border-[#A3F367] overflow-hidden bg-zinc-100 dark:bg-zinc-800 rounded-full">
                {preview || user?.image ? (
                  <Image
                    src={preview || user.image}
                    alt="Avatar"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-2xl font-black text-[#A3F367]">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                )}
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white mb-1">
                  {user?.name}
                </p>
                <p className="text-[11px] text-zinc-400">{user?.email}</p>
              </div>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Display Name
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-zinc-400">
                  <FaUser size={12} />
                </span>
                <Input
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 focus-within:border-[#A3F367]! rounded-none p-2 pl-9 text-sm focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Photo */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border border-zinc-200 dark:border-zinc-800 text-sm p-1.5 rounded-none file:bg-[#A3F367] file:text-zinc-950 file:border-none file:px-3 file:py-1 file:font-bold file:mr-3 file:cursor-pointer file:text-xs file:uppercase file:tracking-wider focus:outline-none focus:border-[#A3F367]/50 text-zinc-400"
              />
              {!imageFile && (
                <p className="text-[10px] text-zinc-400 italic">
                  Current photo will be kept if no new image is chosen.
                </p>
              )}
            </div>

            {/* Save button */}
            <div className="flex justify-end pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <Button
                onPress={handleSave}
                isLoading={isLoading}
                radius="none"
                className="bg-[#A3F367] hover:bg-[#b5fa82] text-zinc-950 font-black text-xs uppercase tracking-widest px-6 h-10 rounded-none transition-all flex items-center gap-2"
              >
                <MdModeEdit size={13} />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
