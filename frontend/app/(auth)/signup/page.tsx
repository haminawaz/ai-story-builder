"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import InputField from "@/components/ui/InputField";
import AuthButton from "@/components/ui/AuthButton";
import Link from "next/link";
const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;

const SignUp = () => {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [alertMessage, setAlertMessage] = useState(false);

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

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
    });

    console.log("Signing up with:", email, password, confirmPassword, rememberMe);
    const formData = { email, password, confirmPassword };
    try {
      const response = await fetch(`${serverBaseUrl}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (response.ok) {
        sessionStorage.setItem("signupEmail", email);
        router.push("/verify-otp");
      } else if (response.status === 403) {
        const error = typeof responseData.error;
        if (error === "object") {
          setErrors(responseData.error);
        } else {
          setAlertMessage(responseData.message || "An error occurred");
          setTimeout(() => setAlertMessage(false), 3000);
        }
      } else {
        setAlertMessage(
          responseData.message || "Login failed. Please try again"
        );
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setDisabled(false);
    }

  };

  return (
    <div className="flex-1 flex justify-center items-center min-h-screen font-inter px-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-[400px] sm:w-[380px]">
         {/* {alertMessage && (
          <div
            className="absolute left-1/2 translate-x-[-50%]"
            style={{ zIndex: 1050, top: "2%", width: "50%" }}
          >
            <Alert
              closable
              showIcon
              message={alertMessage}
              type="error"
              onClose={() => setAlertMessage(false)}
            />
          </div>
        )} */}
        <h2 className="text-[#1D3557] text-3xl sm:text-4xl font-bold mb-4 font-cormorant-garamond">
          Create Account!
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
          {errors?.confirmPassword && (
            <p className="joi-error-message mb-2">{errors?.confirmPassword[0]}</p>
          )}

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

          <AuthButton text="Sign Up" type="submit" className="mt-3 w-full" isDisabled={disabled}/>
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
