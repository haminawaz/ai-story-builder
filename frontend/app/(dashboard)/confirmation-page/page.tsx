"use client";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import StoryImagePanel from "@/components/ui/StoryImagePanel";
import ActionRequiredModal from "@/components/ui/ActionRequiredModal";
import { useRouter } from "next/navigation";

export default function ConfirmationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);   // <-- modal state

  const router = useRouter();

  const handleGoHomeClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Redirecting to Home…");
      router.push("/landing-page");
    }, 2000);
  };

  const handleResendClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Resent the story!");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-between gap-6 lg:gap-10 font-[Inter] p-6 sm:p-8 lg:p-10 bg-[#F1FAEE] w-full">
      {/* Left Panel */}
      <div className="flex-1 flex flex-col justify-between order-2 lg:order-1">
        <Image
          src="/success-tick.svg"
          width={80}
          height={80}
          alt="Success"
          className="object-contain mb-8"
        />
        <div className="flex flex-col justify-between h-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1D3557] mb-4 leading-tight font-[Cormorant_Garamond] font-bold">
            Your Story Has Been Sent!
          </h1>
          <div>
            <p className="text-[#5A9AAF] mb-3 text-lg sm:text-xl lg:text-[22px]">
              We’ve just sent your story to your inbox — a piece of your past,
              now beautifully written.
            </p>
            <p className="text-[#5A9AAF] mb-8 sm:mb-10 lg:mb-12 text-lg sm:text-xl lg:text-[22px]">
              We hope it made you smile, pause, or maybe even tear up. That
              means it worked.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button
              onClick={handleGoHomeClick}
              className="bg-[#A8DADC] hover:bg-[#7FB8C4] text-[#457B9D] hover:text-[#2F4757] font-semibold w-full sm:w-48 py-3 rounded-full transition-colors"
            >
              Create Another!
            </button>
            <button
              onClick={handleResendClick}
              className="bg-[#457B9D] hover:bg-[#3A5A6B] text-white w-full sm:w-48 py-3 rounded-full font-semibold transition-colors"
            >
              Resend My Story
            </button>
          </div>

          <p className="text-[#457B9D] mt-8 text-2xl font-[Cormorant_Garamond] text-center sm:text-left">
            Every memory matters. Every story deserves to be told.
            <br />
            Thank you for trusting us with yours.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <StoryImagePanel onJoin={() => setShowModal(true)} />

      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 z-[50] flex flex-col justify-center items-center bg-[#0000007c] backdrop-blur-md">
          <Image
            src="/loader.svg"
            width={100}
            height={100}
            alt="Loader"
            className="animate-spin mb-4"
          />
          <p className="text-[#F1FAEE] text-2xl font-[Cormorant_Garamond]">
            Please wait…
          </p>
        </div>
      )}

      {/* Modal */}
      {showModal && <ActionRequiredModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
