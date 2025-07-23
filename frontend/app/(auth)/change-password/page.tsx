"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/ui/InputField";
import AuthButton from "@/components/ui/AuthButton";
import StatusModal from "@/components/ui/StatusModal"; // Importing StatusModal
const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const router = useRouter();

  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    setAlertMessage("");
    if (newPassword !== confirmPassword) {
      setAlertMessage("Passwords do not match!");
      setDisabled(false);
      return;
    } else if (!newPassword || !confirmPassword || !oldPassword) {
      setAlertMessage("Please enter all password fields!");
      setDisabled(false);
      return;
    }
    try {
      // Get token from localStorage or cookies as per your auth implementation
      const token = localStorage.getItem("token");
      const response = await fetch(`${serverBaseUrl}/users/update-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsModalOpen(true);
        setTimeout(() => {
          router.push("/profile");
        }, 1000);
      } else {
        setAlertMessage(data.message || "Failed to change password.");
      }
    } catch {
      setAlertMessage("Network error. Please try again.");
    } finally {
      setDisabled(false);
    }
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
            onTogglePassword={() => setOldPasswordVisible(!oldPasswordVisible)}
          />
          <InputField
            label="New Password"
            type={newPasswordVisible ? "text" : "password"}
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="Enter your new password"
            id="newPassword"
            showPasswordToggle={true}
            onTogglePassword={() => setNewPasswordVisible(!newPasswordVisible)}
          />
          <InputField
            label="Confirm Password"
            type={confirmPasswordVisible ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Re-enter your new password"
            id="confirmPassword"
            showPasswordToggle={true}
            onTogglePassword={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          />
          {alertMessage && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{alertMessage}</span>
            </div>
          )}
          <AuthButton text="Submit" type="submit" className="mt-3 w-full" isDisabled={disabled} />
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
