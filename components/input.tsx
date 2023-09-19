"use client";

import { CSSProperties, useState, memo } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputType {
  label?: string;
  name: string;
  placeholder?: string;
  type: string;
  register: any;
  errors?: any;
  autoComplete?: string;
  disabled?: boolean;
  style?: CSSProperties;
  value?: string;
  onChange?: any;
  readOnly?: boolean;
}

const Input = memo(
  ({
    label,
    name,
    placeholder,
    type,
    register,
    errors,
    autoComplete,
    disabled,
    ...props
  }: InputType) => {
    const [inputType, setInputType] = useState(type);

    const toggleInputType = () => {
      setInputType("text");
      setTimeout(() => {
        setInputType("password");
      }, 3000);
    };

    return (
      <div className="flex flex-col gap-2 mb-4">
        {label && (
          <label
            htmlFor={name}
            className={`text-sm md:text-lg ${
              disabled === true ? "text-red-600" : "text-slate-800"
            }`}
          >
            {label}
          </label>
        )}
        <div className="relative w-full">
          <input
            type={inputType}
            id={name}
            {...register(name, { required: true })}
            aria-invalid={errors[name] ? "true" : "false"}
            autoSave="true"
            autoCorrect="on"
            spellCheck={
              name !== "password"
                ? "true"
                : "confirmPassword"
                ? "true"
                : "false"
            }
            autoComplete={autoComplete}
            placeholder={placeholder}
            className={`input ${
              disabled === true ? "cursor-not-allowed" : "cursor-text"
            }`}
            {...props}
          />
          {type === "password" && (
            <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={toggleInputType}
            >
              {inputType === "password" ? (
                <AiOutlineEyeInvisible className="text-2xl text-slate-500" />
              ) : (
                <AiOutlineEye className="text-2xl text-slate-500" />
              )}
            </span>
          )}
        </div>
        {errors[name] && (
          <span role="alert" className="text-sm text-red-700">
            {errors[name].message}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
