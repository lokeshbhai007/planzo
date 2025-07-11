"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { db } from "../../../../utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses, Incomes } from "../../../../utils/schema";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

// Professional Dark Mode Loading Component
const DashboardLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
      <div className="text-center space-y-8">
        {/* Enhanced Glowing Ring Animation */}
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 dark:border-t-blue-400 animate-spin"></div>
          <div className="absolute inset-1 rounded-full border-2 border-transparent border-t-purple-400 dark:border-t-purple-300 animate-spin" style={{animationDuration: '0.8s', animationDirection: 'reverse'}}></div>
          <div className="absolute inset-0 rounded-full bg-blue-500 dark:bg-blue-400 opacity-20 animate-ping"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Loading Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-300">Fetching your financial data...</p>
        </div>

        {/* Progress Steps */}
        <div className="space-y-4 max-w-sm mx-auto">
          <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
            <span>Loading budgets...</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <span>Fetching expenses...</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <span>Calculating insights...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function Dashboard() {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  /**
   * used to get budget List
   */
  const getBudgetList = async () => {
    try {
      setIsLoading(true);
      
      // Record the start time for minimum loading duration
      const startTime = Date.now();
      
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));
      
      setBudgetList(result);
      
      // Wait for all data to be fetched
      await Promise.all([
        getAllExpenses(),
        getIncomeList()
      ]);
      
      // Calculate elapsed time and ensure minimum 1 second loading time
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(1000 - elapsedTime, 0);
      
      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
      
    } catch (error) {
      console.error("Error fetching budget list:", error);
      setIsLoading(false);
    }
  };

  /**
   * Get Income stream list
   */
  const getIncomeList = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Incomes),
          totalAmount: sql`SUM(CAST(${Incomes.amount} AS NUMERIC))`.mapWith(
            Number
          ),
        })
        .from(Incomes)
        .where(eq(Incomes.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Incomes.id);

      setIncomeList(result);
      console.log("show income : "+ incomeList);
      
    } catch (error) {
      console.error("Error fetching income list:", error);
    }
  };

  /**
   * Used to get All expenses belong to users
   */
  const getAllExpenses = async () => {
    try {
      const result = await db
        .select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.createdAt,
        })
        .from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
        .orderBy(desc(Expenses.id));
      
      setExpensesList(result);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Show loading screen while data is being fetched
  if (isLoading) {
    return <DashboardLoading />;
  }

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-bold capitalize text-4xl text-gray-800 dark:text-gray-100">
          Hi, {user?.fullName || "User"} 
          <span className="hidden md:text-4xl md:inline">👋</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 pt-2">
          Here's what's happening with your money, Let's Manage your expense
        </p>

        <div className="mt-8">
          <CardInfo budgetList={budgetList} incomeList={incomeList} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 mt-8 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm dark:shadow-gray-700/20 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <BarChartDashboard budgetList={budgetList} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm dark:shadow-gray-700/20 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <ExpenseListTable
                expensesList={expensesList}
                refreshData={() => getBudgetList()}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm dark:shadow-gray-700/20 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-4">
                Latest Budgets
              </h2>
              <div className="space-y-4">
                {budgetList?.length > 0
                  ? budgetList.map((budget, index) => (
                      <div key={index} className="transform transition-transform duration-200 hover:scale-[1.02]">
                        <BudgetItem budget={budget} />
                      </div>
                    ))
                  : [1, 2, 3, 4].map((item, index) => (
                      <div
                        key={index}
                        className="h-[180px] w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                      ></div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;