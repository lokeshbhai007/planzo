import { db } from "../../../../../../utils/dbConfig";
import { Expenses } from "../../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";
// import { toast } from "sonner";
import { toast } from "react-hot-toast";

function ExpenseListTable({ expensesList, refreshData }) {
  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    if (result) {
      toast.success("Expense Deleted!");
      refreshData();
    }
  };
  
  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">Latest Expenses</h2>
      <div className="grid grid-cols-4 rounded-tl-xl rounded-tr-xl bg-gray-200 dark:bg-gray-700 p-2 mt-3 transition-colors duration-300">
        <h2 className="font-bold text-gray-800 dark:text-gray-100">Name</h2>
        <h2 className="font-bold text-gray-800 dark:text-gray-100">Amount</h2>
        <h2 className="font-bold text-gray-800 dark:text-gray-100">Date</h2>
        <h2 className="font-bold text-gray-800 dark:text-gray-100">Action</h2>
      </div>
      {expensesList.map((expenses, index) => (
        <div
          key={index}
          className="grid grid-cols-4 bg-gray-50 dark:bg-gray-800 rounded-bl-xl rounded-br-xl p-2 border-b border-gray-200 dark:border-gray-600 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <h2 className="text-xs sm:text-sm text-gray-700 dark:text-gray-200">{expenses.name}</h2>
          <h2 className="text-xs pl-4 sm:text-sm text-gray-700 dark:text-gray-200">{expenses.amount}</h2>
          <h2 className="text-xs sm:text-sm text-gray-700 dark:text-gray-200">{expenses.createdAt}</h2>
          <h2
            onClick={() => deleteExpense(expenses)}
            className="text-red-500 dark:text-red-400 pl-2 text-xs sm:text-sm cursor-pointer hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200"
          >
            Delete
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;