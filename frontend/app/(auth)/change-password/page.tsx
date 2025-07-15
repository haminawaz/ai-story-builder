"use client";
import React, { useState } from "react";
import InputField from "@/components/ui/InputField";
import AuthButton from "@/components/ui/AuthButton";
import StatusModal from "@/components/ui/StatusModal"; // Importing StatusModal
import { toast } from "sonner"; // Importing toast from sonner
import { useRouter } from "next/navigation";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    } else if (!newPassword || !confirmPassword || !oldPassword) {
      toast.error("Please enter password!");
      return;
    }
    console.log("Changing password with:", oldPassword, newPassword);

    // Open the modal upon successful password change
    setIsModalOpen(true);
    setTimeout(() => {
      router.push("/profile");
    }, 1000);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen font-inter px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg w-full max-w-[400px] sm:w-[380px]">
        <h2 className="text-[#1D3557] text-3xl sm:text-4xl font-bold mb-4 font-cormorant-garamond">
          Change Password
        </h2>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Old Password"
            type={oldPasswordVisible ? "text" : "password"}
            value={oldPassword}
            onChange={handleOldPasswordChange}
            placeholder="Enter your old password"
            id="oldPassword"
            showPasswordToggle={true}
            onTogglePassword={() => setOldPasswordVisible(!oldPasswordVisible)} // Toggle visibility
          />

          <InputField
            label="New Password"
            type={newPasswordVisible ? "text" : "password"}
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="Enter your new password"
            id="newPassword"
            showPasswordToggle={true}
            onTogglePassword={() => setNewPasswordVisible(!newPasswordVisible)} // Toggle visibility
          />

          <InputField
            label="Confirm Password"
            type={confirmPasswordVisible ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Re-enter your new password"
            id="confirmPassword"
            showPasswordToggle={true}
            onTogglePassword={() =>
              setConfirmPasswordVisible(!confirmPasswordVisible)
            } // Toggle visibility
          />

          <AuthButton text="Submit" type="submit" className="mt-3 w-full" />
        </form>
      </div>

      {/* StatusModal component */}
      <StatusModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message="Password has been changed successfully!"
      />
    </div>
  );
};

export default ChangePassword;
