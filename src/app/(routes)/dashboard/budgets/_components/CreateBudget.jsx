"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "../../../../../../utils/dbConfig";
import { Budgets } from "../../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";

function CreateBudget({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const { user } = useUser();

  /**
   * Used to Create New Budget
   */
  const onCreateBudget = async () => {
    const result = await db
      .insert(Budgets)
      .values({
        name: name,
        amount: amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojiIcon,
      })
      .returning({ insertedId: Budgets.id });

    if (result) {
      refreshData();
      toast.success("New Budget Created!");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-gray-100 dark:bg-gray-700 p-10 rounded-2xl items-center flex flex-col border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:shadow-md dark:hover:shadow-gray-700/20 h-[170px] transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 group">
            <h2 className="text-3xl text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">
              +
            </h2>
            <h2 className="text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-200 font-medium">
              Create New Budget
            </h2>
          </div>
        </DialogTrigger>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <DialogHeader>
            <DialogTitle className="text-gray-800 dark:text-gray-100">
              Create New Budget
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              Create a new budget to track your expenses
            </DialogDescription>
          </DialogHeader>
          <div className="mt-5">
            <Button
              variant="outline"
              className="text-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 transition-colors duration-200"
              onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
            >
              {emojiIcon}
            </Button>
            <div className="absolute z-20">
              <EmojiPicker
                open={openEmojiPicker}
                onEmojiClick={(e) => {
                  setEmojiIcon(e.emoji);
                  setOpenEmojiPicker(false);
                }}
                theme="auto"
              />
            </div>
            <div className="mt-2">
              <label className="text-gray-800 dark:text-gray-100 font-medium my-1 block">
                Budget Name
              </label>
              <Input
                placeholder="e.g. Home Decor"
                onChange={(e) => setName(e.target.value)}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
              />
            </div>
            <div className="mt-2">
              <label className="text-gray-800 dark:text-gray-100 font-medium my-1 block">
                Budget Amount
              </label>
              <Input
                type="number"
                placeholder="e.g. 5000₹"
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={() => onCreateBudget()}
                className="mt-5 w-full rounded-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white transition-colors duration-200"
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;