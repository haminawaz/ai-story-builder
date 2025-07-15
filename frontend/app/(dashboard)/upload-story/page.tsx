"use client";
import { useState } from "react";
import Image from "next/image";
// Removed unused imports
// import { FaChevronRight } from "react-icons/fa";
// import { Upload } from "react-feather";

export default function ClarityQuestions() {
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [activeTab, setActiveTab] = useState("type"); // State for toggling tabs
  const [textValue, setTextValue] = useState(""); // State to store text input
  // Removed unused file state
  // const [file, setFile] = useState<File | null>(null); // State to store file input

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  // const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const uploadedFile = e.target.files ? e.target.files[0] : null;
  //   if (uploadedFile) {
  //     setFile(uploadedFile);
  //   }
  // };

  const handleNextClick = () => {
    setIsFinished(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // You may want to re-enable this if you're using toast
      // toast.success("Story created successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-between gap-6 lg:gap-10 font-[Inter] p-6 sm:p-8 lg:p-10 bg-[url('/assets/clarity-questions-bg.png')] bg-cover bg-center w-full">
      {/* Left Panel - Questions */}
      <div className="flex-1 flex flex-col justify-between order-2 lg:order-1">
        <div className="flex flex-col justify-between h-full">
          {/* Header */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1D3557] mb-4 leading-tight font-[Cormorant_Garamond] font-bold">
            Let&apos;s explore your memory a little deeper
          </h1>
          <p className="text-[#5A9AAF] mb-8 sm:mb-10 lg:mb-12 text-lg sm:text-xl lg:text-[22px]">
            Answer these questions in your own way!
          </p>

          {/* Tab Navigation */}
          <div className="flex mb-6">
            <button
              className={`py-2 px-6 text-xl font-medium rounded-l-lg ${
                activeTab === "type"
                  ? "bg-[#5A9AAF] text-white"
                  : "bg-[#F1FAEE] text-[#5A9AAF]"
              }`}
              onClick={() => setActiveTab("type")}
            >
              Type
            </button>
            <button
              className={`py-2 px-6 text-xl font-medium rounded-r-lg ${
                activeTab === "upload"
                  ? "bg-[#5A9AAF] text-white"
                  : "bg-[#F1FAEE] text-[#5A9AAF]"
              }`}
              onClick={() => setActiveTab("upload")}
            >
              Upload
            </button>
          </div>

          {/* Content Area */}
          <div className="relative h-64 w-full">
            {activeTab === "type" ? (
              <div className="relative h-full">
                <textarea
                  value={textValue}
                  onChange={handleTextChange}
                  placeholder="Type your answer here..."
                  className="w-full text-[20px] rounded-tl-none rounded-tr-lg rounded-b-lg h-full p-6 border border-[#A8DADC] resize-none focus:outline-none focus:ring-2 focus:ring-[#457B9D] focus:border-transparent text-[#457B9D] bg-[#F1FAEE] placeholder-[#457B9D] transition-all duration-200"
                />
                <Image
                  src={"/speak.svg"}
                  width={25}
                  height={25}
                  alt="Speak Icon"
                  className="object-contain absolute top-5 right-5"
                />
              </div>
            ) : (
              <div className="border border-[#A8DADC] rounded-tl-none rounded-tr-lg rounded-b-lg h-full bg-[#F1FAEE] flex flex-col items-center justify-center transition-all duration-200">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".txt,.doc,.docx,.pdf"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center justify-center p-8 rounded-lg transition-colors duration-200"
                >
                  <Image
                    src={"/upload.svg"}
                    width={54}
                    height={54}
                    alt="Upload Icon"
                    className="object-contain mb-2"
                  />
                  <p className="text-[#457B9D] text-xl font-medium mb-2">
                    Upload a txt/doc/pdf file
                  </p>
                </label>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end text-[20px] items-center mt-4">
            <button
              className="bg-[#457B9D] hover:bg-[#3A6B7F] text-white w-40 sm:w-48 py-3 rounded-full font-medium transition-colors"
              onClick={handleNextClick}
            >
              {isFinished ? "Create My Story" : "Next"}
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="w-full lg:w-1/2 relative order-1 lg:order-2 mb-6 sm:mb-0">
        <Image
          src={"/assets/upload-story-image.jpg"}
          width={2000}
          height={2000}
          alt="Clarity Question"
          className="w-full h-full object-cover object-right rounded-lg lg:rounded-tr-[120px]"
        />
      </div>

      {/* Loader */}
      {isLoading && (
        <div className="fixed flex flex-col justify-center items-center bg-[#0000007c] h-full w-full top-0 left-0 backdrop-blur-md">
          <Image
            src={"/loader.svg"}
            width={100}
            height={100}
            alt="Loader"
            className="object-contain animate-spin"
          />
          <p className="text-[#F1FAEE] text-2xl font-[Cormorant_Garamond]">
            Crafting something beautiful from what you&apos;ve shared…
          </p>
        </div>
      )}
    </div>
  );
}
