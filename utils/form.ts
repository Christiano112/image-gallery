import { object, string, ref } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginType, SignUpType } from "./types";

export const signUpSchema = object({
  username: string().trim().required("Username is required"),
  email: string()
    .trim()
    .email("Email must be a valid email")
    .required("Email is required"),
  password: string()
    .trim()
    .min(8, "Password must be a minimum of 8 characters")
    .required("Password is required"),
  confirmPassword: string()
    .trim()
    .min(8, "Password must be a minimum of 8 characters")
    .oneOf([ref("password"), undefined], "Passwords must match")
    .required("Password is required"),
});

export const loginSchema = object({
  email: string()
    .trim()
    .email("Must be a valid email")
    .required("Email is required"),
  password: string()
    .trim()
    .min(8, "Password must be a minimum of 8 characters")
    .required("Password is required"),
}).required();

export const useLoginForm = (onSubmit: (arg0: LoginType) => void) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: yupResolver(loginSchema),
  });

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data);
  });

  return {
    register,
    handleFormSubmit,
    errors,
  };
};

export const useSignUpForm = (onSubmit: (arg0: SignUpType) => void) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: yupResolver(signUpSchema),
  });

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data);
  });

  return {
    register,
    handleFormSubmit,
    errors,
  };
};
