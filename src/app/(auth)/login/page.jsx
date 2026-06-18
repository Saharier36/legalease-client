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
  InputGroup,
  Separator,
} from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataEntries = Object.fromEntries(formData.entries());

    const { data, error } = await signIn.email({
      email: dataEntries.email,
      password: dataEntries.password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Welcome back to LegalEase!");
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
          Access your legal workspace
        </p>
      </div>

      <h3 className="text-xl font-bold text-white mb-6 font-header">
        Welcome Back
      </h3>

      <Form onSubmit={handleSignIn} className="space-y-4">
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

        <TextField
          isRequired
          name="password"
          type={isVisible ? "text" : "password"}
          className="w-full"
        >
          <Label className="text-slate-300 text-sm font-light">Password</Label>
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
          <FieldError className="text-red-400 text-xs mt-1" />
        </TextField>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-[#A3F367] hover:bg-[#b5fa82] text-zinc-950 font-bold rounded-none mt-4 text-sm transition-all duration-200"
        >
          Login
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
        Login with Google
      </Button>

      <div className="pt-4 text-center text-xs">
        <span className="text-slate-400">Don&apos;t have an account? </span>
        <Link
          href="/register"
          className="font-bold text-[#A3F367] hover:underline"
        >
          Register here &gt;
        </Link>
      </div>
    </div>
  );
}
