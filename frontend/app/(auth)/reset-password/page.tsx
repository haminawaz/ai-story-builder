"use client";
import React, { useState } from "react";
import InputField from "@/components/ui/InputField";
import AuthButton from "@/components/ui/AuthButton";
import StatusModal from "@/components/ui/StatusModal";
import { toast } from "sonner"; // Importing toast from sonner

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      // Show toast error notification instead of alert
      toast.error("Passwords do not match!");
      return;
    }
    console.log("Resetting password with:", newPassword, confirmPassword);

    // Open the modal upon successful password reset
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="flex justify-center items-center min-h-screen font-inter px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg w-full max-w-[400px] sm:w-[380px]">
        <h2 className="text-[#1D3557] text-3xl sm:text-4xl font-bold mb-4 font-cormorant-garamond">
          Create New Password
        </h2>

        <form onSubmit={handleSubmit}>
          <InputField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="Enter your password"
            id="newPassword"
            showPasswordToggle={true}
          />

          <InputField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Re-enter Password"
            id="confirmPassword"
            showPasswordToggle={true}
          />

          <AuthButton text="Submit" type="submit" className="mt-3 w-full" />
        </form>
      </div>

      {/* StatusModal component */}
      <StatusModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message="Password has been reset successfully!"
      />
    </div>
  );
};

export default ResetPassword;
