"use client";

import React, { useEffect, useState } from "react";
import PricingCard from "@/components/ui/PricingCard";
import { handleSessionExpiry } from "@/utils/handleSessionExpiry";
const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;

const PricingSection = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setAlertMessage("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${serverBaseUrl}/plans/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        if (handleSessionExpiry(data.message, setAlertMessage)) return;
        const msg = data.message || "Failed to fetch plans";
        setAlertMessage(msg);
      } else {
        setPlans(data.response);
      }
    } catch {
      setAlertMessage("Network error. Please try again");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="p-10 relative z-10 bg-[url('/assets/letter-image.png')]">
        {alertMessage && (
          <div
            className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{alertMessage}</span>
          </div>
        )}
        <div className="relative flex bg-[#F1FAEE] rounded-2xl pb-15 flex-col items-center justify-center min-h-screen">
          <div className="bg-[url('/assets/letter-image.png')] rounded-t-2xl w-full h-[250px] bg-cover bg-center flex justify-center items-center">
            <div className="text-center text-white px-4 py-12">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 font-[Cormorant_Garamond]">
                How do you want to continue?
              </h1>
              <p className="text-lg sm:text-xl text-white/90">
                Choose which plan is right for you
              </p>
            </div>
          </div>

          {/* Pricing Cards Flexbox */}
          <div className="flex flex-wrap justify-center gap-15 lg:10 xl:gap-5 w-full mt-12 max-w-full px-6 md:px-0">
            {plans.map((plan, idx) => (
              <PricingCard key={idx} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
