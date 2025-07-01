"use client";
import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { db } from "../../../../utils/dbConfig";
import { Budgets } from "../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

function layout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  
  useEffect(() => {
    user && checkUserBudgets();
  }, [user]);

  const checkUserBudgets = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
    console.log("yes" + result);

    if (result?.length == 0) {
      router.replace("/dashboard/budgets");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar - Fixed positioning */}
      <div className="fixed md:w-64 hidden md:block h-full z-30">
        <SideNav />
      </div>
      
      {/* Mobile Sidebar - Handled within SideNav component */}
      <div className="md:hidden">
        <SideNav />
      </div>

      {/* Main Content Area */}
      <div className="md:ml-64 min-h-screen">
        {/* Header with mobile padding for hamburger menu */}
        <div className="pt-16 md:pt-0">
          <DashboardHeader />
        </div>
        <Toaster position="top-right" />
        
        {/* Page Content */}
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default layout;
