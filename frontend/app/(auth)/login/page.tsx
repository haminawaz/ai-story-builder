"use client";
import React, { useState } from "react";
import Image from "next/image";
import InputField from "@/components/ui/InputField";
import AuthButton from "@/components/ui/AuthButton";
import Link from "next/link"; // Import Link from next/link
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // Added state for password visibility

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const router = useRouter();
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault(); // Prevent form submission at the top

  if (!email.trim()) {
    toast.error("Please enter your email");
    return;
  }

  if (!password.trim()) {
    toast.error("Please enter your password");
    return;
  }

  // Optional: You can add regex validation for email format here
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!emailRegex.test(email)) {
  //   toast.error("Please enter a valid email address");
  //   return;
  // }

  // Success: proceed with login
  console.log("Logging in with:", email, password, rememberMe);
  toast.success("Login successful!");
  router.push("/profile");
};


  return (
    <div className="flex justify-center items-center min-h-screen font-inter px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg w-full max-w-[400px] sm:w-[380px]">
        <h2 className="text-[#1D3557] text-3xl sm:text-4xl font-bold mb-4 font-cormorant-garamond">
          Welcome!
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
              <Link
                href="/forgot-password"
                className="font-semibold text-sm underline decoration-[#1D3557] hover:decoration-transparent"
              >
                Forgot Password
              </Link>
            </div>
          </div>

          <AuthButton text="Log in" type="submit" className="mt-3 w-full" />
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
          <span className="">New Here?</span>
          <Link
            href="/signup"
            className="font-semibold underline decoration-[#1D3557] hover:decoration-transparent"
          >
            Create a Free Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
