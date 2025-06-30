// components/Header.js (Responsive version)
"use client"

import React from "react"
import {useState , useEffect} from "react"
import Image from 'next/image';
import { useUser, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Header() {
  const {user, isSignedIn } = useUser()
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 w-full z-50 transition-all duration-300 p-3 px-4 sm:p-5 sm:px-8 lg:px-16 xl:px-36 flex justify-between items-center shadow-sm ${
        scrolled
          ? "backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}>
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Image src={"./chart-donut.svg"} alt="logo" width={40} height={25} />
          <span className="text-blue-800 font-bold text-xl sm:text-2xl">Planzo</span>
        </div>

        {/* Navigation Section */}
        { isSignedIn ? (
         <div className="flex gap-2 sm:gap-3 items-center">
           <Link href="/dashboard">
             <Button className="rounded-full bg-white text-black border hover:text-amber-50 hover:bg-black text-xs sm:text-sm px-3 sm:px-4">
               Dashboard
             </Button>
           </Link>
           <UserButton afterSignOutUrl="/" />
         </div>
       ) : (
        <div className="flex gap-2 sm:gap-3 items-center">
          <Link href="/sign-in">
            <Button className="rounded-full bg-white text-black border hover:text-amber-50 hover:bg-black text-xs sm:text-sm px-3 sm:px-4">
              Sign In
            </Button>
          </Link>
           
          <Link href="/sign-up">
            <Button className="rounded-full text-xs sm:text-sm px-3 sm:px-4">
              <span className="hidden sm:inline">Get Started</span>
              <span className="sm:hidden">Start</span>
            </Button>
          </Link>
       </div>
       )}
    </div>
  )
}

export default Header