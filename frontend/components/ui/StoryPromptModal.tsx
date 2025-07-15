"use client";

import { useState } from "react";
import { Mic, X, PenTool } from "lucide-react";
import { Sparkles } from "lucide-react";
import { Button } from "./Button";
import { useRouter } from "next/navigation";

interface StoryPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StoryPromptModal({
  isOpen,
  onClose,
}: StoryPromptModalProps) {
  const router = useRouter();
  const [story, setStory] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  if (!isOpen) return null;


  const handleContinue = () => {
    router.push("/clarity-questions");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden animate-scale-in border border-[#A8DADC]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors group"
        >
          <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
        </button>

        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <div className="p-2 rounded-full bg-[#457B9D] shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-[#1D3557] mb-2 font-[Cormorant_Garamond]">
              Share Your Story
            </h2>
            <p className="text-[#5A9AAF] text-sm">
              Every great story begins with a single moment. What’s yours?
            </p>
          </div>

          {/* Textarea */}
          <div className="relative mb-6">
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Once upon a time... or perhaps it was just yesterday."
              className="w-full h-32 p-4 text-gray-800 bg-[#F1FAEE] border border-[#A8DADC] rounded-xl resize-none placeholder-gray-400 text-sm leading-relaxed focus:outline-none focus:border-[#457B9D] focus:ring-4 focus:ring-[#A8DADC]/50 transition-all duration-200"
              rows={4}
            />

            {/* Floating Buttons */}
            <div className="absolute bottom-3 right-3 flex gap-2">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`p-2 rounded-full transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-110 ${
                  isRecording
                    ? "bg-red-500 hover:bg-red-600 animate-pulse"
                    : "bg-[#457B9D] hover:bg-[#1D3557]"
                }`}
                title="Voice input"
              >
                <Mic className="w-4 h-4 text-white" />
              </button>

              <button
                className="p-2 rounded-full bg-[#A8DADC] hover:bg-[#82C9CC] transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
                title="Writing assistant"
              >
                <PenTool className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Status + Count */}
          <div className="flex justify-between items-center mt-1 px-1 text-xs text-gray-500">
            <span className={story.length ? "text-[#457B9D] font-medium" : ""}>
              {story.length > 0 && "Great start!"}
            </span>
            <span>{story.length}/1000</span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <Button
              onClick={handleContinue}
              disabled={story.trim().length === 0}
              className="flex-1 py-3 text-sm font-semibold bg-[#457B9D] text-white hover:bg-[#1D3557] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
            >
              Continue Journey
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Quote */}
          <div className="mt-6 p-3 bg-[#F1FAEE] border border-[#A8DADC] rounded-xl">
            <p className="text-center text-[#5A9AAF] italic text-xs">
              &quot;The universe is made of stories, not atoms.&quot; – Muriel
              Rukeyser
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
