import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "../../../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../../../utils/schema";
import { Loader } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);

  /**
   * Used to Add New Expense
   */
  const addNewExpense = async () => {
    setLoading(true);
    const result = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: moment().format("DD/MM/yyy"),
      })
      .returning({ insertedId: Budgets.id });

    setAmount("");
    setName("");
    if (result) {
      setLoading(false);
      refreshData();
      toast.success("New Expense Added!");
    }
    setLoading(false);
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 p-5 rounded-2xl bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700/20 transition-colors duration-300">
      <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">
        Add Expense
      </h2>
      <div className="mt-2">
        <h2 className="text-gray-800 dark:text-gray-100 font-medium my-1">
          Expense Name
        </h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
        />
      </div>
      <div className="mt-2">
        <h2 className="text-gray-800 dark:text-gray-100 font-medium my-1">
          Expense Amount
        </h2>
        <Input
          placeholder="e.g. 1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
        />
      </div>
      <Button
        disabled={!(name && amount) || loading}
        onClick={() => addNewExpense()}
        className="mt-3 w-full rounded-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white transition-colors duration-200"
      >
        {loading ? (
          <Loader className="animate-spin w-4 h-4 text-white" />
        ) : (
          "Add New Expense"
        )}
      </Button>
    </div>
  );
}

export default AddExpense;