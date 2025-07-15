"use client";
import React, { useState } from "react";
import InputField from "@/components/ui/InputField";
import AuthButton from "@/components/ui/AuthButton";
import Link from "next/link"; // Import Link from next/link

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Resetting password for:", email);
  };

  return (
    <div className="flex justify-center items-center min-h-screen font-inter px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg w-full max-w-[400px] sm:w-[380px]">
        <h2 className="text-[#1D3557] text-3xl sm:text-4xl font-bold mb-4 font-cormorant-garamond">
          Forgot Password?
        </h2>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            id="email"
          />

          <AuthButton text="Send Me Code" type="submit" className="mt-3 w-full" />
        </form>

        <div className="flex justify-center text-sm text-[#1D3557] gap-2 mt-3">
          <span className="">Remembered your password?</span>
          <Link
            href="/login"
            className="font-semibold underline decoration-[#1D3557] hover:decoration-transparent"
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
