import Link from "next/link";
import React from "react";

function BudgetItem({ budget }) {
  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };
  
  return (
    <Link href={"/dashboard/expenses/" + budget?.id}>
      <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-md dark:hover:shadow-gray-700/20 cursor-pointer h-[170px] bg-white dark:bg-gray-800 transition-all duration-300 hover:scale-[1.02] group">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl p-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-full transition-colors duration-200 group-hover:bg-gray-200 dark:group-hover:bg-gray-600">
              {budget?.icon}
            </h2>
            <div>
              <h2 className="font-bold text-gray-800 dark:text-gray-100">
                {budget.name}
              </h2>
              <h2 className="text-sm text-gray-500 dark:text-gray-400">
                {budget.totalItem} Item
              </h2>
            </div>
          </div>
          <h2 className="font-bold text-blue-600 dark:text-blue-400 text-lg">
            ₹{budget.amount}
          </h2>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-gray-500 dark:text-gray-400">
              ₹{budget.totalSpend ? budget.totalSpend : 0} Spend
            </h2>
            <h2 className="text-xs text-gray-500 dark:text-gray-400">
              ₹{budget.amount - budget.totalSpend} Remaining
            </h2>
          </div>
          <div className="w-full bg-gray-300 dark:bg-gray-600 h-2 rounded-full transition-colors duration-200">
            <div
              className="bg-blue-500 dark:bg-blue-400 h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{
                width: `${calculateProgressPerc()}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;