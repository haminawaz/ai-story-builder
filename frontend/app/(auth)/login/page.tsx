"use client";
import React, { useState } from "react";
import InputField from "@/components/ui/InputField";
import AuthButton from "@/components/ui/AuthButton";
import Link from "next/link"; // Import Link from next/link
import { useRouter } from "next/navigation";
import GoogleLoginButton from "@/components/GoogleLoginButton";
const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [alertMessage, setAlertMessage] = useState("");
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    setErrors({ email: "", password: "" });
    setAlertMessage("");
    const formData = { email, password };
    try {
      const response = await fetch(`${serverBaseUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (response.ok) {
        const { token, data } = responseData.response;
        router.push("/landing-page");
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ email: data.email }));
      } else if (response.status === 403) {
        const error = typeof responseData.error;
        if (error === "object") {
          setErrors(responseData.error);
        }
      } else {
        setAlertMessage(
          responseData.message || "Login failed. Please try again"
        );
        setTimeout(() => setAlertMessage(""), 3000);
      }
    } catch {
      setAlertMessage("Network error. Please try again.");
      setTimeout(() => setAlertMessage(""), 3000);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen font-inter px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg w-full max-w-[400px] sm:w-[380px]">
        <h2 className="text-[#1D3557] text-3xl sm:text-4xl font-bold mb-4 font-cormorant-garamond">
          Welcome!
        </h2>
        {alertMessage && (
          <div className={`mt-4 mb-8 bg-red-100 border-red-400 text-red-700 border px-4 py-3 rounded relative`} role="alert">
            <span className="block sm:inline">{alertMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            id="email"
          />
          {errors?.email && (
            <p className="joi-error-message mb-4">{errors?.email[0]}</p>
          )}

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
          {errors?.password && (
            <p className="joi-error-message mb-4">{errors?.password[0]}</p>
          )}

          <div className="flex items-center my-2">
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

          <AuthButton text="Log in" type="submit" className="mt-3 w-full" isDisabled={disabled} />
        </form>

        <div className="flex items-center justify-center my-3">
          <div className="h-[1px] w-full bg-[#A8DADC]"></div>
          <span className="mx-4 text-[#1D3557] text-sm font-bold">Or</span>
          <div className="h-[1px] w-full bg-[#A8DADC]"></div>
        </div>
        <GoogleLoginButton />

{/* 
        <button className="w-full text-sm font-semibold cursor-pointer h-[47px] border-2 border-[#1D3557] text-[#1D3557] rounded-md flex justify-center items-center space-x-2">
          <Image
            src={"/google.svg"}
            width={18}
            height={18}
            alt="Google Logo"
            className="object-cover"
          />
          <span>Continue with Google</span>
        </button> */}

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
