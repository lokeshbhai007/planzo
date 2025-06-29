"use client";
import React, { useEffect, useState } from "react";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  CircleDollarSign,
  TrendingUp,
  TrendingDownIcon,
  Menu,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

function SideNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const menuList = [
    {
      id: 1,
      icon: LayoutGrid,
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      id: 2,
      icon: CircleDollarSign,
      name: "Incomes",
      path: "/dashboard/incomes",
    },
    {
      id: 3,
      icon: PiggyBank,
      name: "Budgets",
      path: "/dashboard/budgets",
    },
    {
      id: 4,
      icon: ReceiptText,
      name: "Expenses",
      path: "/dashboard/expenses",
    },
    {
      id: 5,
      icon: ShieldCheck,
      name: "Upgrade",
      path: "/upgrade",
    },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  // Close mobile menu when clicking on a link
  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('#mobile-menu') && !event.target.closest('#menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          id="menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-white shadow-md border hover:bg-gray-50"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block h-screen p-5 border">
        <div className="flex items-center gap-1 mb-10">
          <Image src={"/chart-donut.svg"} alt="logo" width={40} height={25} priority />
          <span className="text-blue-800 font-bold text-3xl">Planzo</span>
        </div>

        {/* menu list */}
        <div className="mt-5">
          {menuList.map((menu, index) => (
            <Link href={menu.path} key={index}>
              <h2
                className={`flex gap-2 items-center
                    text-gray-500 font-medium
                    mb-2
                    p-4 cursor-pointer rounded-full
                    hover:text-primary hover:bg-blue-100
                    ${path == menu.path && "text-primary bg-blue-100"}
                    `}
              >
                <menu.icon />
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>
        
        {/* below profile button */}
        <div className="fixed justify-center bottom-10 p-5 cursor-pointer flex ml-7 text-xl gap-2 items-center">
          <UserButton />
          Profile
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed top-0 left-0 h-screen w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5">
          <div className="flex items-center gap-1 mb-10 mt-12">
            <Image src={"./chart-donut.svg"} alt="logo" width={40} height={25} />
            <span className="text-blue-800 font-bold text-3xl">Planzo</span>
          </div>

          {/* menu list */}
          <div className="mt-5">
            {menuList.map((menu, index) => (
              <Link href={menu.path} key={index} onClick={handleMenuItemClick}>
                <h2
                  className={`flex gap-2 items-center
                      text-gray-500 font-medium
                      mb-2
                      p-4 cursor-pointer rounded-full
                      hover:text-primary hover:bg-blue-100
                      ${path == menu.path && "text-primary bg-blue-100"}
                      `}
                >
                  <menu.icon />
                  {menu.name}
                </h2>
              </Link>
            ))}
          </div>
          
          {/* profile button */}
          <div className="absolute mt-10 ml-20 left-5 flex gap-2 items-center">
            <UserButton />
            Profile
          </div>
        </div>
      </div>
    </>
  );
}

export default SideNav;