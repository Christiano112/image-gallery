"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { AiFillGoogleCircle, AiFillGithub } from "react-icons/ai";
import Input from "@/components/input";
import { SuccessToast, ErrorToast } from "@/utils/toast";
import { useLoginForm } from "@/utils/form";
import supaBase from "@/utils/supabase";
import { getURL } from "@/utils/url";
import { LoginType } from "@/utils/types";

const Login = () => {
  const router = useRouter();

  const onLogin = async (data: LoginType) => {
    const { email, password } = data;
    try {
      const { data, error } = await supaBase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        ErrorToast(error?.message);
        return;
      }

      SuccessToast("Login Successful");
      router.push("/");
    } catch (error) {
      ErrorToast("An error occurred during login");
    }
  };

  const { register, handleFormSubmit, errors } = useLoginForm(onLogin);

  const signInWithGoogle = async () => {
    const { data, error } = await supaBase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getURL(),
      },
    });
    if (error) {
      ErrorToast(error?.message);
      return;
    }
  };

  const signInWithGitHub = async () => {
    const { data, error } = await supaBase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: getURL(),
      },
    });
    if (error) {
      ErrorToast(error?.message);
      return;
    }
  };

  return (
    <main className="mx-auto w-[90%] my-10 flex flex-col items-center p-4 rounded-2xl shadow-2xl max-w-[40rem]">
      <h1 className="text-xl md:text-3xl text-black text-center font-bold">
        Welcome Back to <span className="text-primary">ChrixGallery</span>
      </h1>
      <form
        method="post"
        action=""
        onSubmit={handleFormSubmit}
        className="mx-auto mt-8 w-[90%] md:w-[80%] pb-8"
      >
        <Input
          label="Email"
          name="email"
          placeholder="Email"
          type="email"
          autoComplete="email"
          register={register}
          errors={errors}
        />
        <Input
          label="Password"
          name="password"
          placeholder="Password"
          type="password"
          autoComplete="current-password"
          register={register}
          errors={errors}
        />
        <button type="submit" className="btn" onClick={handleFormSubmit}>
          Login
        </button>
      </form>
      <div className="flex flex-col items-center justify-center md:w-[80%] mx-auto">
        <h5 className="font-medium text-xl">Or Sign in with Socials</h5>
        <button
          className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg mt-2"
          onClick={signInWithGoogle}
        >
          <AiFillGoogleCircle className="mr-2 text-4xl" />
          Google
        </button>
        <button
          className="flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg mt-2"
          onClick={signInWithGitHub}
        >
          <AiFillGithub className="mr-2 text-4xl" />
          GitHub
        </button>
      </div>
      <p className="mt-10 text-center">
        Don{"'"}t have an account?{" "}
        <Link
          href="/signup"
          className="underline hover:text-blue-800 hover:underline-offset-4 whitespace-nowrap"
        >
          Sign Up
        </Link>
      </p>
    </main>
  );
};

export default Login;
