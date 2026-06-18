"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Form,
  Button,
  TextField,
  Label,
  FieldError,
  Description,
  InputGroup,
  Separator,
  Spinner,
} from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { toast } from "sonner";
import { signUp, signIn } from "@/lib/auth-client";

export default function RegisterPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState("user");
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataEntries = Object.fromEntries(formData.entries());

    if (dataEntries.password !== dataEntries.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const imageFile = formData.get("image");
    let uploadedImageUrl = "";

    if (imageFile && imageFile.size > 0) {
      setIsUploading(true);
      const imgBbFormData = new FormData();
      imgBbFormData.append("image", imageFile);

      try {
        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

        const imgBbResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: imgBbFormData,
          },
        );

        const imgBbResult = await imgBbResponse.json();

        if (imgBbResult.success) {
          uploadedImageUrl = imgBbResult.data.url;
        } else {
          toast.error("Image upload failed to ImgBB!");
          setIsUploading(false);
          return;
        }
      } catch (err) {
        toast.error("Something went wrong during image upload!");
        setIsUploading(false);
        return;
      }
    } else {
      toast.error("Please select an image file!");
      return;
    }
    setIsUploading(false);

    const { data, error } = await signUp.email({
      email: dataEntries.email,
      password: dataEntries.password,
      name: dataEntries.name,
      image: uploadedImageUrl,
      role: selectedRole,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Account created successfully!");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-2xl flex flex-col justify-between rounded-none relative">
      <div className="text-center mb-6">
        <Link href="/">
          <h2 className="font-header text-3xl font-extrabold tracking-wide text-white">
            Legal<span className="text-[#A3F367]">Ease</span>
          </h2>
        </Link>
        <p className="text-xs text-slate-400 font-light mt-1">
          Create your professional legal account
        </p>
      </div>

      <h3 className="text-xl font-bold text-white mb-6 font-header">
        Create Account
      </h3>

      <Form onSubmit={handleSignUp} className="space-y-4">
        <TextField isRequired name="name" className="w-full">
          <Label className="text-slate-300 text-sm font-light">Full Name</Label>
          <InputGroup.Input
            placeholder="Enter your full name"
            className="bg-white/5 border border-white/10 text-white rounded-none p-2 focus:border-[#A3F367]/50"
          />
          <FieldError className="text-red-400 text-xs mt-1" />
        </TextField>

        <TextField isRequired name="email" type="email" className="w-full">
          <Label className="text-slate-300 text-sm font-light">
            Email Address
          </Label>
          <InputGroup.Input
            placeholder="you@example.com"
            className="bg-white/5 border border-white/10 text-white rounded-none p-2 focus:border-[#A3F367]/50"
          />
          <FieldError className="text-red-400 text-xs mt-1" />
        </TextField>

        <div className="flex flex-col gap-1 w-full">
          <label className="text-slate-300 text-sm font-light">
            Upload Photo
          </label>
          <input
            required
            name="image"
            type="file"
            accept="image/*"
            className="w-full bg-white/5 border border-white/10 text-white rounded-none p-1.5 text-sm file:bg-[#A3F367] file:text-zinc-950 file:border-none file:px-3 file:py-1 file:font-bold file:mr-3 file:cursor-pointer focus:outline-none focus:border-[#A3F367]/50"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="text-slate-300 text-sm font-light">Join As</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full bg-[#05291A] border border-white/10 text-white rounded-none p-2.5 text-sm focus:outline-none focus:border-[#A3F367]/50"
          >
            <option value="user" name="role">
              User (Seeking Legal Help)
            </option>
            <option value="lawyer" name="role">
              Lawyer (Offering Services)
            </option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <TextField
            isRequired
            name="password"
            type={isVisible ? "text" : "password"}
            validate={(value) =>
              value.length < 8 ? "Must be at least 8 characters" : null
            }
            className="w-full"
          >
            <Label className="text-slate-300 text-sm font-light">
              Password
            </Label>
            <InputGroup className="bg-white/5 border border-white/10 rounded-none pr-2 flex items-center">
              <InputGroup.Input
                placeholder="••••••••"
                className="text-white w-full p-2 bg-transparent border-none outline-none"
              />
              <InputGroup.Suffix className="pr-0">
                <Button
                  isIconOnly
                  size="sm"
                  variant="ghost"
                  className="text-slate-400 hover:text-white"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <HiEye className="size-5" />
                  ) : (
                    <HiEyeOff className="size-5" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            <Description className="text-[10px] text-slate-400 font-light mt-1">
              At least 8 characters
            </Description>
            <FieldError className="text-red-400 text-xs mt-1" />
          </TextField>

          <TextField
            isRequired
            name="confirmPassword"
            type={isConfirmVisible ? "text" : "password"}
            className="w-full"
          >
            <Label className="text-slate-300 text-sm font-light">
              Confirm Password
            </Label>
            <InputGroup className="bg-white/5 border border-white/10 rounded-none pr-2 flex items-center">
              <InputGroup.Input
                placeholder="••••••••"
                className="text-white w-full p-2 bg-transparent border-none outline-none"
              />
              <InputGroup.Suffix className="pr-0">
                <Button
                  isIconOnly
                  size="sm"
                  variant="ghost"
                  className="text-slate-400 hover:text-white"
                  onPress={() => setIsConfirmVisible(!isConfirmVisible)}
                >
                  {isConfirmVisible ? (
                    <HiEye className="size-5" />
                  ) : (
                    <HiEyeOff className="size-5" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            <FieldError className="text-red-400 text-xs mt-1" />
          </TextField>
        </div>

        <Button
          type="submit"
          size="lg"
          isDisabled={isUploading}
          className="w-full bg-[#A3F367] hover:bg-[#b5fa82] text-zinc-950 font-bold rounded-none mt-2 text-sm transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isUploading ? (
            <>
              <Spinner size="sm" color="current" />
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </Form>

      <div className="flex items-center my-4 gap-3">
        <Separator className="flex-1 bg-white/10" />
        <span className="text-xs font-bold text-slate-400">or</span>
        <Separator className="flex-1 bg-white/10" />
      </div>

      <Button
        onClick={() => signIn.social({ provider: "google" })}
        size="lg"
        className="w-full text-sm bg-white/10 hover:bg-white/20 text-white font-semibold rounded-none border border-white/10 transition-all duration-200"
      >
        <FcGoogle className="size-5 shrink-0 mr-2" />
        Continue with Google
      </Button>

      <div className="pt-4 text-center text-xs">
        <span className="text-slate-400">Already have an account? </span>
        <Link
          href="/login"
          className="font-bold text-[#A3F367] hover:underline"
        >
          Login here &gt;
        </Link>
      </div>
    </div>
  );
}
