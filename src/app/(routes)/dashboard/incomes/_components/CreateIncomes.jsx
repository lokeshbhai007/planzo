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
import { Incomes } from "../../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
// import { toast } from "sonner";
import { toast } from "react-hot-toast";

function CreateIncomes({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Add dialog state control

  const { user } = useUser();

  /**
   * Used to Create New Income Source
   */
  const onCreateIncomes = async () => {
    try {
      const result = await db
        .insert(Incomes)
        .values({
          name: name,
          amount: amount,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          icon: emojiIcon,
        })
        .returning({ insertedId: Incomes.id });

      if (result && result.length > 0) {
        // Reset form
        setName("");
        setAmount("");
        setEmojiIcon("😀");
        
        // Close dialog
        setIsOpen(false);
        
        // Refresh data
        refreshData();
        
        // Show success toast
        toast.success("New Income Source Created!", {
          description: `${name} has been added successfully`,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error creating income source:", error);
      toast.error("Failed to create income source", {
        description: "Please try again",
        duration: 3000,
      });
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div
            className="bg-slate-100 dark:bg-gray-700 p-10 rounded-2xl
            items-center flex flex-col border-2 border-dashed border-gray-300 dark:border-gray-600
            cursor-pointer hover:shadow-md dark:hover:shadow-gray-700/20 h-[170px] 
            transition-all duration-300 hover:scale-[1.02] text-gray-700 dark:text-gray-200"
            onClick={() => setIsOpen(true)}
          >
            <h2 className="text-3xl">+</h2>
            <h2>Create New Income Source</h2>
          </div>
        </DialogTrigger>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-800 dark:text-gray-100">
              Create New Income Source
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              Add a new source of income to track your earnings.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5">
            <Button
              variant="outline"
              className="text-lg border-gray-200 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
              hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300"
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
              />
            </div>
            <div className="mt-2">
              <h2 className="text-gray-800 dark:text-gray-100 font-medium my-1">
                Source Name
              </h2>
              <Input
                placeholder="e.g. Youtube"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 
                text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400
                focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300"
              />
            </div>
            <div className="mt-2">
              <h2 className="text-gray-800 dark:text-gray-100 font-medium my-1">
                Monthly Amount
              </h2>
              <Input
                type="number"
                placeholder="e.g. 5000₹"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 
                text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400
                focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300"
              />
            </div>
          </div>

          <DialogFooter className="sm:justify-start">
            <Button
              disabled={!(name && amount)}
              onClick={onCreateIncomes}
              className="mt-5 w-full rounded-full bg-blue-600 hover:bg-blue-700 
              dark:bg-blue-500 dark:hover:bg-blue-600 text-white 
              disabled:bg-gray-400 dark:disabled:bg-gray-600 
              transition-colors duration-300"
            >
              Create Income Source
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateIncomes;