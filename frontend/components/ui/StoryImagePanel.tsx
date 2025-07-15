"use client";
import Image from "next/image";

interface Props {
  onJoin: () => void;          // <-- new prop
}

export default function StoryImagePanel({ onJoin }: Props) {
  return (
    <div className="w-full lg:w-1/2 relative order-1 lg:order-2 mb-6 sm:mb-0">
      <div className="relative w-full h-full">
        <Image
          src="/assets/clarity-confirmation-image.jpg"
          width={2000}
          height={2000}
          alt="Story Confirmation"
          className="w-full h-100 md:h-full object-cover rounded-lg lg:rounded-tr-[120px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-[#0000004D] to-[#000000B2] rounded-lg lg:rounded-tr-[120px]" />
        <div className="absolute inset-0 flex justify-center items-center text-white px-12">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 font-semibold">
              Want to turn this into part of a legacy storybook?
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-4">
              Join our <span className="font-bold">&quot;Free 2-hour mini workshop&quot;</span> where
              you&rsquo;ll create your first beautiful storybook alongside others who
              value preserving memories — plus you get 3 free stories! No
              experience needed.
            </p>
            <button
              onClick={onJoin}                                  // <-- opens modal
              className="bg-[#457B9D] hover:bg-[#3A5A6B] text-white px-6 py-[10px] rounded-full font-medium transition-colors"
            >
              Join for free!
            </button>
            <p className="text-xs sm:text-lg mt-6">
              Next workshop: This Saturday at 2&nbsp;PM&nbsp;EST
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
