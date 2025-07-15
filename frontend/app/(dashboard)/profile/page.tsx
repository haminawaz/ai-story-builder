"use client";
import React, { useState } from "react";
import StoryImagePanel from "@/components/ui/StoryImagePanel";
import InputField from "@/components/ui/InputField";
import ActionRequiredModal from "@/components/ui/ActionRequiredModal";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [showModal, setShowModal] = useState(false); // Modal state for work
  const [password, setPassword] = useState("ai story builder"); // Example password
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

  const router = useRouter();


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-between gap-6 lg:gap-10 font-inter p-6 sm:p-8 lg:p-10 bg-[#fdfdfd] w-full">
      {/* Left Panel (User Info) */}
          {/* Left Panel (User Info) */}
      <div className="w-full lg:w-1/2 flex flex-col space-y-6">
        <h1 className="text-3xl sm:text-4xl text-[#1D3557] font-[Cormorant_Garamond] font-bold">
          General Info
        </h1>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <InputField
            label="Email"
            type="email"
            value="iamjaisuthar@gmail.com"
            placeholder="Enter your email"
            id="email"
            disabled={true}
          />

          <InputField
            label="Password"
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            id="password"
            showPasswordToggle={true}
            disabled={true}
            onTogglePassword={togglePasswordVisibility}
          />

          <div className="space-y-2 pt-2">
            <h1 className="text-3xl sm:text-4xl text-[#1D3557] font-[Cormorant_Garamond] font-bold">
              Subscription Info
            </h1>
            <p className="text-[#457B9D] text-sm">
              *All available stories expire in 365 days if not used
            </p>
          </div>

          <InputField
            label="Current Plan"
            type="text"
            value="DIY(2/5 stories generated)"
            placeholder="Enter your plan"
            id="plan"
            disabled={true}
          />

          <InputField
            label="Expiry Date"
            type="date"
            value="2024-12-09"
            placeholder="Enter expiry date"
            id="expiry-date"
            disabled={true}
          />

          <button
            onClick={() => router.push("/change-password")}
            className="bg-[#A8DADC] hover:bg-[#7FB8C4] text-[#457B9D] hover:text-[#2F4757] font-semibold w-full sm:w-48 py-3 rounded-full transition-colors"
          >
            Change Password
          </button>
        </form>
      </div>

      <StoryImagePanel onJoin={() => setShowModal(true)} />

      {/* Modal */}
      {showModal && <ActionRequiredModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Profile;
