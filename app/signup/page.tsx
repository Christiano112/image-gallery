"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "@/components/input";
import { SuccessToast, ErrorToast } from "@/utils/toast";
import { useSignUpForm } from "@/utils/form";
import supaBase from "@/utils/supabase";
import { SignUpType } from "@/utils/types";

const mapSignUpDataToColumns = (signUpData: SignUpType, id: string) => {
  const { username, email } = signUpData;

  return {
    username,
    email,
    user_id: id,
  };
};

const SignUp = () => {
  const router = useRouter();

  const onSignUp = async (data: SignUpType) => {
    const { email, password } = data;
    const { data: newData, error: newError } = await supaBase.auth.signUp({
      email,
      password,
    });
    if (newData?.user?.id && !newError) {
      const mappedData = mapSignUpDataToColumns(data, newData.user.id);
      const { error } = await supaBase.from("users").insert([mappedData]);

      if (error) {
        if (
          error?.message.includes("duplicate") &&
          error?.message.includes("username")
        ) {
          ErrorToast("Username already exists");
          return;
        }
        if (
          error?.message.includes("duplicate") &&
          error?.message.includes("email")
        ) {
          ErrorToast("Email already exists");
          return;
        }
        ErrorToast(error?.message);
        return;
      }

      SuccessToast("Check your email for verification");
      router.push("/login");
    }
  };

  const { register, handleFormSubmit, errors } = useSignUpForm(onSignUp);

  return (
    <main className="mx-auto w-[90%] my-10 flex flex-col items-center p-4 rounded-2xl shadow-2xl max-w-[40rem]">
      <h1 className="text-xl md:text-3xl text-black text-center font-bold">
        Register to enjoy <span className="text-primary">ChrixGallery</span>
      </h1>
      <form
        onSubmit={handleFormSubmit}
        className="mx-auto mt-8 w-[90%] md:w-[80%] pb-8"
      >
        <Input
          label="Username"
          name="username"
          placeholder="Enter your username"
          type="text"
          autoComplete="username"
          register={register}
          errors={errors}
        />
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
          autoComplete="new-password"
          register={register}
          errors={errors}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          autoComplete="new-password"
          register={register}
          errors={errors}
        />
        <button type="submit" className="btn" onClick={handleFormSubmit}>
          Register
        </button>
      </form>
      <p className="pb-8 text-center">
        Already have an account?{" "}
        <Link
          href="/login"
          className="underline hover:text-blue-800 hover:underline-offset-4"
        >
          Login
        </Link>
      </p>
    </main>
  );
};

export default SignUp;
