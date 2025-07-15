"use client";

import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Home", path: "/landing-page" },
    { label: "How this works?", path: "/how-it-works" },
    { label: "FAQ's", path: "/faqs" },
    { label: "Story", path: "/story" },
    { label: "Profile", path: "/profile" }, // ✅ Added profile route
  ];

  return (
    <>
      <header className="w-full bg-[#A8DADC] shadow-md backdrop-blur-lg z-50">
        <nav className="max-w-[1440px] mx-auto h-[80px] px-4 lg:px-6 flex items-center justify-between">
          {/* Logo */}
          <div
            className="text-[#1D3557] text-2xl font-serif font-bold tracking-wider cursor-pointer"
            onClick={() => router.push("/landing-page")}
          >
            -LOGO-
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navItems.map(({ label, path }, idx) => (
              <span
                key={idx}
                className={`text-[#1D3557] text-lg cursor-pointer transition-colors hover:text-[#163054] ${
                  pathname === path ? "font-bold" : "font-medium"
                }`}
                onClick={() => router.push(path)}
              >
                {label}
              </span>
            ))}

            <button
              onClick={() => router.push("/login")}
              className="bg-[#1D3557] text-white px-6 py-2 rounded-full text-base font-semibold hover:bg-[#163054] transition-all duration-300 shadow-md"
            >
              Login here!
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden">
            <RxHamburgerMenu
              size={28}
              className="text-[#1D3557] cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
        </nav>
      </header>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-[75%] max-w-xs bg-[#A8DADC] p-6 shadow-xl z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end mb-6">
          <IoClose
            size={28}
            className="text-[#1D3557] cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* Mobile Menu Items */}
        <div className="flex flex-col gap-6">
          {navItems.map(({ label, path }, idx) => (
            <span
              key={idx}
              className={`text-[#1D3557] text-lg cursor-pointer transition-colors hover:text-[#163054] ${
                pathname === path ? "font-bold" : "font-semibold"
              }`}
              onClick={() => {
                setOpen(false);
                router.push(path);
              }}
            >
              {label}
            </span>
          ))}

          <button
            onClick={() => {
              setOpen(false);
              router.push("/login");
            }}
            className="mt-4 w-full bg-[#1D3557] text-white py-3 rounded-full font-semibold hover:bg-[#163054] transition-all"
          >
            Login here!
          </button>
        </div>
      </aside>
    </>
  );
};

export default Header;
