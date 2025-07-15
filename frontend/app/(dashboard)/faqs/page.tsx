// app/faqs/page.tsx
"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "Do I need to be a good writer to use this?",
    answer:
      "Absolutely not! This app is made for anyone who has a story to share. Speak or type — we handle the rest.",
  },
  {
    question: "Can I edit the AI-generated story?",
    answer:
      "Yes! Once the story is generated, you’ll be able to review and make any personal tweaks you want.",
  },
  {
    question: "What happens to my memories? Are they saved?",
    answer:
      "Your privacy is important. We store your inputs securely and you can choose to delete them anytime.",
  },
  {
    question: "Can I use this on my phone?",
    answer:
      "Yes! The platform is fully responsive and mobile-friendly. You can create your story on any device.",
  },
  {
    question: "Is there a cost to generate a story?",
    answer:
      "Currently, you can generate your first story for free. Additional stories may be priced affordably.",
  },
];

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto font-[Inter]">
      <h1 className="text-4xl sm:text-6xl font-[Cormorant_Garamond] text-[#1D3557] mb-10 text-center">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border border-[#A8DADC] rounded-lg overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex justify-between items-center px-5 py-4 bg-[#F1FAEE] text-left text-[#1D3557] font-semibold text-lg sm:text-xl hover:bg-[#E9F1F2] transition"
            >
              {faq.question}
              {openIndex === idx ? (
                <FaChevronUp className="text-[#5A9AAF]" />
              ) : (
                <FaChevronDown className="text-[#5A9AAF]" />
              )}
            </button>
            {openIndex === idx && (
              <div className="px-5 pb-4 text-[#5A9AAF] text-base sm:text-lg">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}