"use client";

import React from "react";
import {
  FaRegLightbulb,
  FaRegQuestionCircle,
  FaRobot,
  FaRegEdit,
} from "react-icons/fa";

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Step 1: Share Your Memory",
      description:
        "You begin by simply speaking or typing a meaningful memory — no writing skills required!",
      icon: <FaRegLightbulb size={32} className="text-[#457B9D]" />,
    },
    {
      title: "Step 2: Answer Clarity Questions",
      description:
        "We guide you through a few thoughtful questions to help uncover depth and feeling behind your experience.",
      icon: <FaRegQuestionCircle size={32} className="text-[#457B9D]" />,
    },
    {
      title: "Step 3: Let AI Craft Your Story",
      description:
        "Our advanced AI transforms your input into a beautiful, heartfelt story written in your voice.",
      icon: <FaRobot size={32} className="text-[#457B9D]" />,
    },
    {
      title: "Step 4: Review & Personalize",
      description:
        "You’ll have a chance to review the story and make small tweaks to ensure it truly represents your memory.",
      icon: <FaRegEdit size={32} className="text-[#457B9D]" />,
    },
  ];

  return (
    <div className="px-6 py-12 md:py-20 max-w-5xl mx-auto font-[Inter]">
      <h1 className="text-4xl sm:text-6xl font-[Cormorant_Garamond] text-[#1D3557] mb-12 text-center">
        How It Works
      </h1>

      <div className="grid gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-start gap-5 p-6 bg-[#F1FAEE] rounded-xl border border-[#A8DADC] shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex-shrink-0 mt-1">{step.icon}</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#1D3557] mb-2">
                {step.title}
              </h2>
              <p className="text-[#5A9AAF] text-base sm:text-lg">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
