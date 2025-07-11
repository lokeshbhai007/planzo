"use client"

import {
  PiggyBank,
  ReceiptText,
  Wallet,
  Sparkles,
  CircleDollarSign,
} from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import formatNumber from "../../../../../utils/index"
import { getFinancialAdvice } from "../../../../../utils/getFinancial";

// Global cache that persists across component re-mounts
const globalAdviceCache = new Map();
let lastKnownValues = { budget: 0, income: 0, spend: 0 };

function CardInfo({budgetList , incomeList}) {
  
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [financialAdvice, setFinancialAdvice] = useState("");
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(false);
  
  // Use global cache instead of component-level cache
  const adviceCache = useRef(globalAdviceCache);
  const lastFinancialValues = useRef(lastKnownValues);

  useEffect(() => {
    if (budgetList?.length > 0 || incomeList?.length > 0) {
      CalculateCardInfo();
    }
  }, [budgetList, incomeList]);

  useEffect(() => {
    if (totalBudget > 0 || totalIncome > 0 || totalSpend > 0) {
      handleFinancialAdvice();
    }
  }, [totalBudget, totalIncome, totalSpend]);

  // Generate a cache key based on financial values
  const generateCacheKey = (budget, income, spend) => {
    return `${budget}-${income}-${spend}`;
  };

  // Check if financial values have changed significantly
  const hasSignificantChange = (newBudget, newIncome, newSpend, compareBudget, compareIncome, compareSpend) => {
    // If no comparison values provided, use last known values
    const budget = compareBudget !== undefined ? compareBudget : lastFinancialValues.current.budget;
    const income = compareIncome !== undefined ? compareIncome : lastFinancialValues.current.income;
    const spend = compareSpend !== undefined ? compareSpend : lastFinancialValues.current.spend;
    
    const threshold = 0.05; // 5% change threshold (increased for less sensitivity)
    
    const budgetChange = Math.abs(newBudget - budget) / (budget || 1);
    const incomeChange = Math.abs(newIncome - income) / (income || 1);
    const spendChange = Math.abs(newSpend - spend) / (spend || 1);
    
    return budgetChange > threshold || incomeChange > threshold || spendChange > threshold;
  };

  const handleFinancialAdvice = async () => {
    const cacheKey = generateCacheKey(totalBudget, totalIncome, totalSpend);
    
    // Check if we have cached advice for these exact values
    if (adviceCache.current.has(cacheKey)) {
      console.log("Using cached financial advice");
      setFinancialAdvice(adviceCache.current.get(cacheKey));
      return;
    }
    
    // Check if values are exactly the same as last known values
    if (totalBudget === lastFinancialValues.current.budget && 
        totalIncome === lastFinancialValues.current.income && 
        totalSpend === lastFinancialValues.current.spend &&
        financialAdvice) {
      console.log("Same values as before, keeping existing advice");
      return;
    }
    
    // Check if values have changed significantly from any cached version
    let foundSimilarCache = false;
    for (let [key, advice] of adviceCache.current.entries()) {
      const [cachedBudget, cachedIncome, cachedSpend] = key.split('-').map(Number);
      if (!hasSignificantChange(totalBudget, totalIncome, totalSpend, cachedBudget, cachedIncome, cachedSpend)) {
        console.log("Using similar cached advice");
        setFinancialAdvice(advice);
        foundSimilarCache = true;
        break;
      }
    }
    
    if (foundSimilarCache) return;
    
    // Generate new advice only if no similar cached version exists
    console.log("Generating new financial advice due to significant changes");
    setIsLoadingAdvice(true);
    
    try {
      const advice = await getFinancialAdvice(
        totalBudget,
        totalIncome,
        totalSpend
      );
      
      // Cache the new advice
      adviceCache.current.set(cacheKey, advice);
      
      // Update last known values globally
      lastKnownValues.budget = totalBudget;
      lastKnownValues.income = totalIncome;
      lastKnownValues.spend = totalSpend;
      lastFinancialValues.current = lastKnownValues;
      
      setFinancialAdvice(advice);
      
      // Optional: Limit cache size to prevent memory issues
      if (adviceCache.current.size > 50) {
        const firstKey = adviceCache.current.keys().next().value;
        adviceCache.current.delete(firstKey);
      }
      
    } catch (error) {
      console.error("Error fetching financial advice:", error);
      setFinancialAdvice("Unable to generate financial advice at the moment.");
    } finally {
      setIsLoadingAdvice(false);
    }
  };

  const CalculateCardInfo = () => {
    console.log(budgetList);
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    let totalIncome_ = 0;

    budgetList.forEach((element) => {
      totalBudget_ = totalBudget_ + Number(element.amount);
      totalSpend_ = totalSpend_ + element.totalSpend;
    });

    incomeList.forEach((element) => {
      totalIncome_ = totalIncome_ + element.totalAmount;
    });

    setTotalIncome(totalIncome_);
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div>
          {/* AI Advice Card */}
          <div className="p-7 border border-gray-200 dark:border-gray-700 mt-4 -mb-1 rounded-2xl flex items-center justify-between bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700/20 transition-colors duration-300">
            <div className="">
              <div className="flex mb-2 flex-row space-x-1 items-center ">
                <h2 className="text-md text-gray-800 dark:text-gray-100 font-medium">Planzo AI</h2>
                <Sparkles
                  className={`rounded-full text-white w-8 h-8 p-2
                    bg-gradient-to-r
                    from-pink-500
                    via-red-500
                    to-yellow-500
                    ${isLoadingAdvice ? 'animate-pulse' : ''}
                    bg-[length:200%_200%]
                    animate-gradient-x
                    shadow-lg shadow-pink-500/50 dark:shadow-pink-400/30
                    transition-all
                    duration-300`}
                  style={{
                    animation: 'gradient-x 3s ease infinite, pulse 2s ease-in-out infinite'
                  }}
                />
              </div>
              <h2 className="font-light text-md text-gray-600 dark:text-gray-300">
                {isLoadingAdvice 
                  ? "Generating new financial advice..." 
                  : financialAdvice || "Loading financial advice..."}
              </h2>

            </div>
          </div>

          {/* Stats Cards Grid */}
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Total Budget Card */}
            <div className="p-7 border border-gray-200 dark:border-gray-700 rounded-2xl flex items-center justify-between bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700/20 transition-all duration-300 hover:shadow-md dark:hover:shadow-gray-600/30 hover:-translate-y-1">
              <div>
                <h2 className="text-sm text-gray-500 dark:text-gray-400">Total Budget</h2>
                <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">
                  ₹{formatNumber(totalBudget)}
                </h2>
              </div>
              <PiggyBank className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 p-3 h-12 w-12 rounded-full text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-400/20" />
            </div>

            {/* Total Spend Card */}
            <div className="p-7 border border-gray-200 dark:border-gray-700 rounded-2xl flex items-center justify-between bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700/20 transition-all duration-300 hover:shadow-md dark:hover:shadow-gray-600/30 hover:-translate-y-1">
              <div>
                <h2 className="text-sm text-gray-500 dark:text-gray-400">Total Spend</h2>
                <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">
                  ₹{formatNumber(totalSpend)}
                </h2>
              </div>
              <ReceiptText className="bg-gradient-to-r from-red-600 to-red-700 dark:from-red-500 dark:to-red-600 p-3 h-12 w-12 rounded-full text-white shadow-lg shadow-red-500/30 dark:shadow-red-400/20" />
            </div>

            {/* Number of Budget Card */}
            <div className="p-7 border border-gray-200 dark:border-gray-700 rounded-2xl flex items-center justify-between bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700/20 transition-all duration-300 hover:shadow-md dark:hover:shadow-gray-600/30 hover:-translate-y-1">
              <div>
                <h2 className="text-sm text-gray-500 dark:text-gray-400">No. Of Budget</h2>
                <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">{budgetList?.length}</h2>
              </div>
              <Wallet className="bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 p-3 h-12 w-12 rounded-full text-white shadow-lg shadow-purple-500/30 dark:shadow-purple-400/20" />
            </div>

            {/* Income Streams Card */}
            <div className="p-7 border border-gray-200 dark:border-gray-700 rounded-2xl flex items-center justify-between bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700/20 transition-all duration-300 hover:shadow-md dark:hover:shadow-gray-600/30 hover:-translate-y-1">
              <div>
                <h2 className="text-sm text-gray-500 dark:text-gray-400">Sum of Income Streams</h2>
                <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">
                  ₹{formatNumber(totalIncome)}
                </h2>
              </div>
              <CircleDollarSign className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-500 dark:to-green-600 p-3 h-12 w-12 rounded-full text-white shadow-lg shadow-green-500/30 dark:shadow-green-400/20" />
            </div>
          </div>
        </div>
      ) : (
        /* Loading Skeleton */
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div
              className="h-[110px] w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"
              key={index}
            ></div>
          ))}
        </div>
      )}
      
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default CardInfo