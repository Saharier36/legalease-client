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
} from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { toast } from "sonner";
import { signUp, signIn } from "@/lib/auth-client";

export default function RegisterPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState("client");
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataEntries = Object.fromEntries(formData.entries());

    if (dataEntries.password !== dataEntries.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const { data, error } = await signUp.email({
      email: dataEntries.email,
      password: dataEntries.password,
      name: dataEntries.name,
      image: dataEntries.image,
      data: { role: selectedRole },
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
            placeholder="john@example.com"
            className="bg-white/5 border border-white/10 text-white rounded-none p-2 focus:border-[#A3F367]/50"
          />
          <FieldError className="text-red-400 text-xs mt-1" />
        </TextField>

        <TextField isRequired name="image" className="w-full">
          <Label className="text-slate-300 text-sm font-light">Photo URL</Label>
          <InputGroup.Input
            placeholder="https://unsplash.com/your-photo.jpg"
            className="bg-white/5 border border-white/10 text-white rounded-none p-2 focus:border-[#A3F367]/50"
          />
          <FieldError className="text-red-400 text-xs mt-1" />
        </TextField>

        <div className="flex flex-col gap-1 w-full">
          <label className="text-slate-300 text-sm font-light">Join As</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full bg-[#05291A] border border-white/10 text-white rounded-none p-2.5 text-sm focus:outline-none focus:border-[#A3F367]/50"
          >
            <option value="client">User (Seeking Legal Help)</option>
            <option value="lawyer">Lawyer (Offering Services)</option>
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
        
            <div className="h-3.75 sm:h-4" />
            <FieldError className="text-red-400 text-xs mt-1" />
          </TextField>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-[#A3F367] hover:bg-[#b5fa82] text-zinc-950 font-bold rounded-none mt-2 text-sm transition-all duration-200"
        >
          Sign Up
        </Button>
      </Form>

      <div className="flex items-center my-4 gap-3">
        <Separator className="flex-1 bg-white/10" />
        <span className="text-xs font-bold text-slate-400">or</span>
        <Separator className="flex-1 bg-white/10" />
      </div>

      <Button
        onClick={() => signIn.social({ provider: "google", callbackURL: "/" })}
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
