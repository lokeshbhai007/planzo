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
import Switch from "./Switch";

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
      if (
        isMobileMenuOpen &&
        !event.target.closest("#mobile-menu") &&
        !event.target.closest("#menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Handle profile click - programmatically trigger UserButton
  const handleProfileClick = (e) => {
    // Find the UserButton trigger element and click it
    const userButtonTrigger =
      e.currentTarget.querySelector(
        '[data-clerk-element="userButtonTrigger"]'
      ) ||
      e.currentTarget.querySelector(".cl-userButtonTrigger") ||
      e.currentTarget.querySelector('button[aria-label*="user"]') ||
      e.currentTarget.querySelector("button");

    if (userButtonTrigger && userButtonTrigger !== e.target) {
      userButtonTrigger.click();
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          id="menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-all duration-200"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-40 transition-opacity duration-300" />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block h-screen p-5 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-1">
            <Image
              src={"/chart-donut.svg"}
              alt="logo"
              width={30}
              height={25}
              priority
              className="filter dark:invert dark:brightness-0 dark:contrast-200"
            />
            <span className="text-blue-800 dark:text-blue-400 font-bold text-3xl">
              Planzo
            </span>
          </div>
          <div className="flex items-center mt-3">
            <Switch />
          </div>
        </div>

        {/* menu list */}
        <div className="mt-5 space-y-2">
          {menuList.map((menu, index) => (
            <Link href={menu.path} key={index}>
              <div
                className={`flex gap-4 items-center
            text-gray-600 dark:text-gray-300 font-medium
            py-4 px-4 cursor-pointer rounded-xl
            hover:text-blue-600 dark:hover:text-blue-400 
            hover:bg-blue-50 dark:hover:bg-blue-900/20
            transition-colors duration-200
            border border-transparent hover:border-blue-100 dark:hover:border-blue-800/30
            ${
              path === menu.path &&
              "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 shadow-sm border-blue-100 dark:border-blue-800/30"
            }
            `}
              >
                <menu.icon size={20} />
                <span>{menu.name}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Profile button */}
        <div className="fixed bottom-10 left-5 right-5 md:right-auto md:w-48 flex items-center justify-center">
          <div
            className="flex items-center gap-3 py-3 px-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
            onClick={handleProfileClick}
          >
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonPopoverCard:
                    "dark:bg-gray-800 dark:border-gray-700",
                  userButtonPopoverActionButton:
                    "dark:text-gray-200 dark:hover:bg-gray-700",
                },
              }}
            />
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              Profile
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed top-0 left-0 h-screen w-80 bg-white dark:bg-gray-900 shadow-xl border-r border-gray-200 dark:border-gray-700 z-50 transform transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-10 mt-12">
            <div className="flex items-center gap-1">
              <Image
                src={"/chart-donut.svg"}
                alt="logo"
                width={30}
                height={25}
                priority
                className="filter dark:invert dark:brightness-0 dark:contrast-200"
              />
              <span className="text-blue-800 dark:text-blue-400 font-bold text-3xl">
                Planzo
              </span>
            </div>
            <div className="flex items-center mt-3">
              <Switch />
            </div>
          </div>

          {/* menu list */}
          <div className="mt-5 space-y-2">
            {menuList.map((menu, index) => (
              <Link href={menu.path} key={index} onClick={handleMenuItemClick}>
                <div
                  className={`flex gap-3 items-center
                      text-gray-600 dark:text-gray-300 font-medium
                      p-4 cursor-pointer rounded-xl
                      hover:text-blue-600 dark:hover:text-blue-400 
                      hover:bg-blue-50 dark:hover:bg-blue-900/20
                      transition-all duration-200 
                      ${
                        path === menu.path &&
                        "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 shadow-sm"
                      }
                      `}
                >
                  <menu.icon size={20} />
                  <span>{menu.name}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* profile button */}
          <div className="mt-20 left-5 right-5 flex items-center justify-center">
            <div
              className="flex items-center gap-3 p-3 px-6 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
              onClick={handleProfileClick}
            >
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                    userButtonPopoverCard:
                      "dark:bg-gray-800 dark:border-gray-700",
                    userButtonPopoverActionButton:
                      "dark:text-gray-200 dark:hover:bg-gray-700",
                  },
                }}
              />
              <span className="text-gray-700 dark:text-gray-200 font-medium">
                Profile
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideNav;
