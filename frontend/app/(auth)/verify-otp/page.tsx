"use client";
import React, { useState, useEffect } from "react";
import InputField from "@/components/ui/InputField";
import AuthButton from "@/components/ui/AuthButton";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30); // Timer state for 30 seconds
  const [isResendEnabled, setIsResendEnabled] = useState(false); // To enable/disable resend button

  useEffect(() => {
    // Decrease timer every second when timer > 0
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setIsResendEnabled(true); // Enable resend after timer reaches 0
    }
  }, [timer]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Verifying OTP:", otp);
  };

  const handleResend = () => {
    setTimer(30); // Reset the timer
    setIsResendEnabled(false); // Disable resend button
    console.log("Resending OTP...");
  };

  return (
    <div className="flex justify-center items-center min-h-screen font-inter px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg w-full max-w-[400px] sm:w-[380px]">
        <h2 className="text-[#1D3557] text-3xl sm:text-4xl font-bold mb-4 font-cormorant-garamond">
          Verify OTP
        </h2>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Enter 5-digit code sent to your email"
            type="text"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter here"
            id="otp"
          />

          <div className="flex justify-between text-sm text-[#1D3557] mt-2">
            <span>{`00:${timer < 10 ? `0${timer}` : timer}`}</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={!isResendEnabled} // Disable button if timer > 0
              className={`${ 
                !isResendEnabled ? "text-[#D1D5DB] cursor-not-allowed " : "text-[#1D3557] cursor-pointer underline"
              } font-semibold  decoration-[#1D3557] hover:decoration-transparent`} // Apply custom text color and disable hover effects
            >
              Resend Code
            </button>
          </div>

          <AuthButton text="Verify" type="submit" className="mt-3 w-full" />
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
