"use client";
import React, { useState } from "react";
import Image from "next/image";
import InputField from "@/components/ui/InputField";
import AuthButton from "@/components/ui/AuthButton";
import Link from "next/link";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // States to handle password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signing up with:", email, password, confirmPassword, rememberMe);
  };

  return (
    <div className="flex-1 flex justify-center items-center min-h-screen font-inter px-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-[400px] sm:w-[380px]">
        <h2 className="text-[#1D3557] text-3xl sm:text-4xl font-bold mb-4 font-cormorant-garamond">
          Create Account!
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

          <InputField
            label="Password"
            type={passwordVisible ? "text" : "password"} // Toggle between password and text
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            id="password"
            showPasswordToggle={true}
            onTogglePassword={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
          />

          <InputField
            label="Confirm Password"
            type={confirmPasswordVisible ? "text" : "password"} // Toggle between password and text
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Re-enter Password"
            id="confirmPassword"
            showPasswordToggle={true}
            onTogglePassword={() => setConfirmPasswordVisible(!confirmPasswordVisible)} // Toggle password visibility
          />

          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 text-[#1D3557] cursor-pointer"
            />
            <div className="flex justify-between items-center w-full">
              <label
                htmlFor="rememberMe"
                className="text-[#1D3557] text-xs ml-1 cursor-pointer"
              >
                Remember me
              </label>
            </div>
          </div>

          <AuthButton text="Sign Up" type="submit" className="mt-3 w-full" />
        </form>

        <div className="flex items-center justify-center my-3">
          <div className="h-[1px] w-full bg-[#A8DADC]"></div>
          <span className="mx-4 text-[#1D3557] text-sm font-bold">Or</span>
          <div className="h-[1px] w-full bg-[#A8DADC]"></div>
        </div>

        <button className="w-full text-sm font-semibold cursor-pointer h-[47px] border-2 border-[#1D3557] text-[#1D3557] rounded-md flex justify-center items-center space-x-2">
          <Image
            src={"/google.svg"}
            width={18}
            height={18}
            alt="Google Logo"
            className="object-cover"
          />
          <span>Continue with Google</span>
        </button>

        <div className="flex justify-center text-sm text-[#1D3557] gap-2 mt-3">
          <span className="">Already have an account?</span>
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

export default SignUp;
