"use client";
import { Button } from "@/components/ui/Button";
import {
  Download,
  RefreshCw,
  BookOpen,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const Story = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const storyPages = [
    {
      title: "The Garden of Memory",
      content:
        "It was a small backyard, nothing special to most people — cracked stones, a leaning fence, and rows of tomatoes that never quite grew straight. But to me, it was everything. The morning dew would catch the first rays of sunlight, creating tiny diamonds across the weathered wooden planks of our old garden shed.",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
    },
    {
      title: "Saturday Mornings",
      content:
        "Every Saturday morning, I'd sit cross-legged in the dirt beside my grandfather. He moved slow, not because he had to, but because he wanted to. 'The earth remembers,' he'd say, pressing a seed into the soil like it was something sacred. His weathered hands, stained with decades of garden work, held each seed as if it contained the secrets of the universe.",
      image:
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop",
    },
    {
      title: "Lessons in Patience",
      content:
        "I was just a kid, always rushing to get things done. But in that garden, time moved differently. We didn't talk much, not in the way people expect. It was more about presence — the silence filled with lessons I didn't realize I was learning. The rhythmic sound of his hoe against the earth became a meditation, a symphony of patience and purpose.",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
    },
    {
      title: "The Question",
      content:
        "One morning, I asked why he still bothered planting the same herbs every year when he could just buy them from the store. He paused, wiped his hands on his worn jeans, and looked at me with those kind eyes that seemed to hold decades of wisdom. 'Because,' he said slowly, 'even if I don't see them bloom, someone else will. That's what love is — planting seeds for gardens you may never see.'",
      image:
        "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&h=600&fit=crop",
    },
    {
      title: "The Wisdom Unfolds",
      content:
        "As the seasons changed, I began to understand what he meant. The basil we planted would flavor my grandmother's pasta sauce. The roses would bring joy to neighbors passing by. The vegetables would nourish our family through the long winter months. Each seed was an act of faith, a belief in tomorrow, a gift to the future.",
      image:
        "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&fit=crop",
    },
    {
      title: "Years Later",
      content:
        "Now, years later, I find myself in my own small garden, pressing seeds into the earth with the same reverence. The tomatoes still don't grow straight, but that's not the point. The point is remembering that some things are worth tending, even when the harvest feels far away. My children now sit beside me, their small hands eager to help, and I hear my grandfather's voice in the wind.",
      image:
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop",
    },
    {
      title: "The Circle Continues",
      content:
        "Every time I kneel in the dirt, I feel his presence. Every seed I plant carries his memory forward. The garden has become more than plants and flowers — it's a living testament to love, patience, and the quiet faith that what we nurture today will bloom long after we're gone. In this sacred space, generations connect, and love takes root in the most beautiful way.",
      image:
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
    },
  ];

  const handleRevise = () => {
    alert(
      "Revising storyline... This feature will allow you to modify and enhance your story!"
    );
  };

  const handleDownload = () => {
    alert(
      "Downloading PDF... Your beautiful story will be saved as a PDF document!"
    );
  };

  const nextPage = () => {
    if (currentPage < storyPages.length - 1 && !isAnimating) {
      setDirection("forward");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setTimeout(() => setIsAnimating(false), 300);
      }, 150);
    }
  };

  const previousPage = () => {
    if (currentPage > 0 && !isAnimating) {
      setDirection("backward");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setTimeout(() => setIsAnimating(false), 300);
      }, 150);
    }
  };

  const goToPage = (index: number) => {
    if (!isAnimating && index !== currentPage) {
      setDirection(index > currentPage ? "forward" : "backward");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(index);
        setTimeout(() => setIsAnimating(false), 300);
      }, 150);
    }
  };

  const currentStoryPage = storyPages[currentPage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-4 py-12 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 bg-white/10 backdrop-blur-sm border border-white/20">
              <BookOpen className="w-4 h-4" />
              <span>Interactive Story Collection</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif mb-6 leading-tight">
              The Garden of Memory
            </h1>

            <p className="text-lg sm:text-xl mb-8 leading-relaxed max-w-3xl mx-auto opacity-90">
              A profound narrative exploring the timeless bonds between
              generations, wisdom, and the enduring power of love through
              life&apos;s simple moments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleRevise}
                className="w-full sm:w-auto px-8 py-3 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Revise Story
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                className="w-full sm:w-auto px-8 py-3 rounded-lg font-medium bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
            <span>
              Chapter {currentPage + 1} of {storyPages.length}
            </span>
            <span className="hidden sm:inline">
              {Math.round(((currentPage + 1) / storyPages.length) * 100)}%
              Complete
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${((currentPage + 1) / storyPages.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Story Section */}
      <div className="py-8 sm:py-12 lg:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 px-0 md:px-4 gap-8 lg:gap-16 items-center">
            {/* Story Content */}
            <div className="order-2 lg:order-1">
              <div
                className={`transition-all duration-500 ease-in-out ${
                  isAnimating
                    ? direction === "forward"
                      ? "transform translate-x-8 opacity-0"
                      : "transform -translate-x-8 opacity-0"
                    : "transform translate-x-0 opacity-100"
                }`}
              >
                <div className="mb-8">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-6 leading-tight text-slate-800">
                    {currentStoryPage.title}
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
                    <span className="text-4xl sm:text-5xl font-serif float-left mr-3 mt-1 leading-none text-blue-600">
                      {currentStoryPage.content.charAt(0)}
                    </span>
                    {currentStoryPage.content.slice(1)}
                  </p>
                </div>

                {/* Mobile Navigation */}
                <div className="block lg:hidden mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      onClick={previousPage}
                      disabled={currentPage === 0 || isAnimating}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 disabled:opacity-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>

                    <Button
                      onClick={nextPage}
                      disabled={
                        currentPage === storyPages.length - 1 || isAnimating
                      }
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 disabled:opacity-50"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Mobile Page Indicators */}
                  <div className="flex justify-center gap-2">
                    {storyPages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToPage(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentPage
                            ? "bg-blue-600 scale-125"
                            : "bg-slate-300 hover:bg-slate-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Story Image */}
            <div className="order-1 lg:order-2">
              <div
                className={`transition-all duration-500 ease-in-out ${
                  isAnimating
                    ? "transform scale-95 opacity-0"
                    : "transform scale-100 opacity-100"
                }`}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                  <Image
                    src={currentStoryPage.image}
                    alt={currentStoryPage.title}
                    width={2000} // You can adjust or make dynamic
                    height={2000}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectFit: "cover" }}
                    unoptimized // Remove this if you want Next.js to optimize it (use local or remote loader)
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white text-sm font-medium bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2">
                      Chapter {currentPage + 1}: {currentStoryPage.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between mt-12 max-w-4xl mx-auto">
            <Button
              onClick={previousPage}
              disabled={currentPage === 0 || isAnimating}
              variant="outline"
              className="flex items-center gap-2 px-6 py-3 rounded-xl disabled:opacity-50 hover:shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous Chapter
            </Button>

            <div className="flex gap-3 ">
              {storyPages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-110 ${
                    index === currentPage
                      ? "bg-blue-600 scale-125"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextPage}
              disabled={currentPage === storyPages.length - 1 || isAnimating}
              variant="outline"
              className="flex items-center gap-2 px-6 py-3 rounded-xl disabled:opacity-50 hover:shadow-lg transition-all duration-300"
            >
              Next Chapter
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Story Statistics */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold mb-2 text-slate-800">
                {storyPages.length}
              </div>
              <div className="text-slate-600">Chapters</div>
            </div>
            <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold mb-2 text-slate-800">8</div>
              <div className="text-slate-600">Minutes Read</div>
            </div>
            <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <User className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold mb-2 text-slate-800">
                Memory
              </div>
              <div className="text-slate-600">Genre</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="py-16 sm:py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-5xl mx-auto text-center px-4">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <BookOpen className="w-10 h-10" />
          </div>
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-serif italic mb-6 leading-relaxed">
            &quot;The best stories are the ones that connect hearts across
            generations.&quot;
          </blockquote>
          <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">
            A timeless reminder that love grows in the gardens we tend together
          </p>
        </div>
      </div>
    </div>
  );
};

export default Story;
// 'use client'
// import { Button } from "@/components/ui/Button";
// import { Download, RefreshCw, BookOpen, Clock, User, ChevronLeft, ChevronRight } from "lucide-react";
// import { useState } from "react";

// const Story = () => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

//   const storyPages = [
//     {
//       title: "The Garden of Memory",
//       content: "It was a small backyard, nothing special to most people — cracked stones, a leaning fence, and rows of tomatoes that never quite grew straight. But to me, it was everything. The morning dew would catch the first rays of sunlight, creating tiny diamonds across the weathered wooden planks of our old garden shed.",
//       image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop"
//     },
//     {
//       title: "Saturday Mornings",
//       content: "Every Saturday morning, I'd sit cross-legged in the dirt beside my grandfather. He moved slow, not because he had to, but because he wanted to. 'The earth remembers,' he'd say, pressing a seed into the soil like it was something sacred. His weathered hands, stained with decades of garden work, held each seed as if it contained the secrets of the universe.",
//       image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop"
//     },
//     {
//       title: "Lessons in Patience",
//       content: "I was just a kid, always rushing to get things done. But in that garden, time moved differently. We didn't talk much, not in the way people expect. It was more about presence — the silence filled with lessons I didn't realize I was learning. The rhythmic sound of his hoe against the earth became a meditation, a symphony of patience and purpose.",
//       image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop"
//     },
//     {
//       title: "The Question",
//       content: "One morning, I asked why he still bothered planting the same herbs every year when he could just buy them from the store. He paused, wiped his hands on his worn jeans, and looked at me with those kind eyes that seemed to hold decades of wisdom. 'Because,' he said slowly, 'even if I don't see them bloom, someone else will. That's what love is — planting seeds for gardens you may never see.'",
//       image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&h=600&fit=crop"
//     },
//     {
//       title: "The Wisdom Unfolds",
//       content: "As the seasons changed, I began to understand what he meant. The basil we planted would flavor my grandmother's pasta sauce. The roses would bring joy to neighbors passing by. The vegetables would nourish our family through the long winter months. Each seed was an act of faith, a belief in tomorrow, a gift to the future.",
//       image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&fit=crop"
//     },
//     {
//       title: "Years Later",
//       content: "Now, years later, I find myself in my own small garden, pressing seeds into the earth with the same reverence. The tomatoes still don't grow straight, but that's not the point. The point is remembering that some things are worth tending, even when the harvest feels far away. My children now sit beside me, their small hands eager to help, and I hear my grandfather's voice in the wind.",
//       image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop"
//     },
//     {
//       title: "The Circle Continues",
//       content: "Every time I kneel in the dirt, I feel his presence. Every seed I plant carries his memory forward. The garden has become more than plants and flowers — it's a living testament to love, patience, and the quiet faith that what we nurture today will bloom long after we're gone. In this sacred space, generations connect, and love takes root in the most beautiful way.",
//       image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop"
//     },
//     {
//       title: "Years Later",
//       content: "Now, years later, I find myself in my own small garden, pressing seeds into the earth with the same reverence. The tomatoes still don't grow straight, but that's not the point. The point is remembering that some things are worth tending, even when the harvest feels far away. My children now sit beside me, their small hands eager to help, and I hear my grandfather's voice in the wind.",
//       image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop"
//     },
//     {
//       title: "The Circle Continues",
//       content: "Every time I kneel in the dirt, I feel his presence. Every seed I plant carries his memory forward. The garden has become more than plants and flowers — it's a living testament to love, patience, and the quiet faith that what we nurture today will bloom long after we're gone. In this sacred space, generations connect, and love takes root in the most beautiful way.",
//       image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop"
//     },
//     {
//       title: "Years Later",
//       content: "Now, years later, I find myself in my own small garden, pressing seeds into the earth with the same reverence. The tomatoes still don't grow straight, but that's not the point. The point is remembering that some things are worth tending, even when the harvest feels far away. My children now sit beside me, their small hands eager to help, and I hear my grandfather's voice in the wind.",
//       image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop"
//     },
//     {
//       title: "The Circle Continues",
//       content: "Every time I kneel in the dirt, I feel his presence. Every seed I plant carries his memory forward. The garden has become more than plants and flowers — it's a living testament to love, patience, and the quiet faith that what we nurture today will bloom long after we're gone. In this sacred space, generations connect, and love takes root in the most beautiful way.",
//       image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop"
//     },
//     {
//       title: "Years Later",
//       content: "Now, years later, I find myself in my own small garden, pressing seeds into the earth with the same reverence. The tomatoes still don't grow straight, but that's not the point. The point is remembering that some things are worth tending, even when the harvest feels far away. My children now sit beside me, their small hands eager to help, and I hear my grandfather's voice in the wind.",
//       image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop"
//     },
//     {
//       title: "The Circle Continues",
//       content: "Every time I kneel in the dirt, I feel his presence. Every seed I plant carries his memory forward. The garden has become more than plants and flowers — it's a living testament to love, patience, and the quiet faith that what we nurture today will bloom long after we're gone. In this sacred space, generations connect, and love takes root in the most beautiful way.",
//       image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop"
//     }
//   ];

//   const handleRevise = () => {
//     alert("Revising storyline... This feature will allow you to modify and enhance your story!");
//   };

//   const handleDownload = () => {
//     alert("Downloading PDF... Your beautiful story will be saved as a PDF document!");
//   };

//   const nextPage = () => {
//     if (currentPage < storyPages.length - 1 && !isAnimating) {
//       setDirection('forward');
//       setIsAnimating(true);
//       setTimeout(() => {
//         setCurrentPage(prev => prev + 1);
//         setTimeout(() => setIsAnimating(false), 300);
//       }, 150);
//     }
//   };

//   const previousPage = () => {
//     if (currentPage > 0 && !isAnimating) {
//       setDirection('backward');
//       setIsAnimating(true);
//       setTimeout(() => {
//         setCurrentPage(prev => prev - 1);
//         setTimeout(() => setIsAnimating(false), 300);
//       }, 150);
//     }
//   };

//   const currentStoryPage = storyPages[currentPage];

//   return (
//     <div className="min-h-screen" style={{ backgroundColor: '#FAF9F6' }}>
//       {/* Hero Section */}
//       <div className="relative py-16 px-4" style={{ backgroundColor: '#FFFDF9' }}>
//         <div className="max-w-4xl mx-auto text-center">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border"
//                style={{ backgroundColor: '#F1FAEE', borderColor: '#A8DADC' }}>
//             <BookOpen className="w-4 h-4" style={{ color: '#457B9D' }} />
//             <span style={{ color: '#1D3557' }}>Interactive Story Collection</span>
//           </div>

//           <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight" style={{ color: '#1D3557' }}>
//             The Garden of Memory
//           </h1>

//           <p className="text-xl mb-8 leading-relaxed max-w-2xl mx-auto" style={{ color: '#457B9D' }}>
//             A profound narrative exploring the timeless bonds between generations,
//             wisdom, and the enduring power of love through life's simple moments.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <Button
//               onClick={handleRevise}
//               className="px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
//               style={{ backgroundColor: '#457B9D', color: 'white' }}
//             >
//               <RefreshCw className="w-4 h-4 mr-2" />
//               Revise Story
//             </Button>
//             <Button
//               onClick={handleDownload}
//               variant="outline"
//               className="px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
//               style={{ borderColor: '#457B9D', color: '#457B9D' }}
//             >
//               <Download className="w-4 h-4 mr-2" />
//               Download PDF
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Main Story Section */}
//       <div className="py-12 px-4">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Story Content */}
//             <div className="order-2 lg:order-1">
//               <div className={`transition-all duration-500 ease-in-out ${
//                 isAnimating
//                   ? direction === 'forward'
//                     ? 'transform translate-x-8 opacity-0'
//                     : 'transform -translate-x-8 opacity-0'
//                   : 'transform translate-x-0 opacity-100'
//               }`}>
//                 <div className="mb-6">
//                   <div className="flex items-center gap-4 mb-4">
//                     <span className="text-sm font-medium px-3 py-1 rounded-full"
//                           style={{ backgroundColor: '#F1FAEE', color: '#457B9D' }}>
//                       Chapter {currentPage + 1} of {storyPages.length}
//                     </span>
//                     <div className="h-px flex-1" style={{ backgroundColor: '#A8DADC' }}></div>
//                   </div>

//                   <h2 className="text-3xl md:text-4xl font-serif mb-6 leading-tight" style={{ color: '#1D3557' }}>
//                     {currentStoryPage.title}
//                   </h2>
//                 </div>

//                 <div className="prose prose-lg max-w-none">
//                   <p className="text-lg leading-8 mb-8" style={{ color: '#457B9D' }}>
//                     <span className="text-4xl font-serif float-left mr-3 mt-1 leading-none" style={{ color: '#1D3557' }}>
//                       {currentStoryPage.content.charAt(0)}
//                     </span>
//                     {currentStoryPage.content.slice(1)}
//                   </p>
//                 </div>

//                 {/* Navigation */}
//                 <div className="flex items-center justify-between mt-8">
//                   <Button
//                     onClick={previousPage}
//                     disabled={currentPage === 0 || isAnimating}
//                     variant="outline"
//                     className="flex items-center gap-2 px-6 py-2 rounded-lg disabled:opacity-50"
//                     style={{ borderColor: '#A8DADC', color: '#457B9D' }}
//                   >
//                     <ChevronLeft className="w-4 h-4" />
//                     Previous
//                   </Button>

//                   <div className="flex gap-[5px] md:gap-2">
//                     {storyPages.map((_, index) => (
//                       <button
//                         key={index}
//                         onClick={() => {
//                           if (!isAnimating && index !== currentPage) {
//                             setDirection(index > currentPage ? 'forward' : 'backward');
//                             setIsAnimating(true);
//                             setTimeout(() => {
//                               setCurrentPage(index);
//                               setTimeout(() => setIsAnimating(false), 300);
//                             }, 150);
//                           }
//                         }}
//                         className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
//                           index === currentPage ? 'scale-125' : 'hover:scale-110'
//                         }`}
//                         style={{
//                           backgroundColor: index === currentPage ? '#457B9D' : '#A8DADC'
//                         }}
//                       />
//                     ))}
//                   </div>

//                   <Button
//                     onClick={nextPage}
//                     disabled={currentPage === storyPages.length - 1 || isAnimating}
//                     variant="outline"
//                     className="flex items-center gap-2 px-6 py-2 rounded-lg disabled:opacity-50"
//                     style={{ borderColor: '#A8DADC', color: '#457B9D' }}
//                   >
//                     Next
//                     <ChevronRight className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </div>
//             </div>

//             {/* Story Image */}
//             <div className="order-1 lg:order-2">
//               <div className={`transition-all duration-500 ease-in-out ${
//                 isAnimating
//                   ? 'transform scale-95 opacity-0'
//                   : 'transform scale-100 opacity-100'
//               }`}>
//                 <div className="relative rounded-2xl overflow-hidden shadow-2xl">
//                   <img
//                     src={currentStoryPage.image}
//                     alt={currentStoryPage.title}
//                     className="w-full h-[500px] object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Story Statistics */}
//       <div className="py-8 px-4" style={{ backgroundColor: '#F1FAEE' }}>
//         <div className="max-w-4xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="text-center p-6 rounded-xl" style={{ backgroundColor: 'white' }}>
//               <BookOpen className="w-8 h-8 mx-auto mb-3" style={{ color: '#457B9D' }} />
//               <div className="text-2xl font-bold mb-1" style={{ color: '#1D3557' }}>{storyPages.length}</div>
//               <div className="text-sm" style={{ color: '#457B9D' }}>Chapters</div>
//             </div>
//             <div className="text-center p-6 rounded-xl" style={{ backgroundColor: 'white' }}>
//               <Clock className="w-8 h-8 mx-auto mb-3" style={{ color: '#457B9D' }} />
//               <div className="text-2xl font-bold mb-1" style={{ color: '#1D3557' }}>8</div>
//               <div className="text-sm" style={{ color: '#457B9D' }}>Minutes Read</div>
//             </div>
//             <div className="text-center p-6 rounded-xl" style={{ backgroundColor: 'white' }}>
//               <User className="w-8 h-8 mx-auto mb-3" style={{ color: '#457B9D' }} />
//               <div className="text-2xl font-bold mb-1" style={{ color: '#1D3557' }}>Memory</div>
//               <div className="text-sm" style={{ color: '#457B9D' }}>Genre</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Quote */}
//       <div className="py-16 px-4" style={{ backgroundColor: '#FFFDF9' }}>
//         <div className="max-w-3xl mx-auto text-center">
//           <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
//                style={{ backgroundColor: '#457B9D' }}>
//             <BookOpen className="w-8 h-8 text-white" />
//           </div>
//           <blockquote className="text-2xl md:text-3xl font-serif italic mb-4 leading-relaxed"
//                       style={{ color: '#1D3557' }}>
//             "The best stories are the ones that connect hearts across generations."
//           </blockquote>
//           <p className="text-lg" style={{ color: '#457B9D' }}>
//             A timeless reminder that love grows in the gardens we tend together
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Story;
