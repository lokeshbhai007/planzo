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
import { toast } from "sonner";

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
            className="bg-slate-100 p-10 rounded-2xl
            items-center flex flex-col border-2 border-dashed
            cursor-pointer hover:shadow-md h-[170px]"
            onClick={() => setIsOpen(true)}
          >
            <h2 className="text-3xl">+</h2>
            <h2>Create New Income Source</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Income Source</DialogTitle>
            <DialogDescription>
              Add a new source of income to track your earnings.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5">
            <Button
              variant="outline"
              className="text-lg"
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
              <h2 className="text-black font-medium my-1">Source Name</h2>
              <Input
                placeholder="e.g. Youtube"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <h2 className="text-black font-medium my-1">Monthly Amount</h2>
              <Input
                type="number"
                placeholder="e.g. 5000₹"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="sm:justify-start">
            <Button
              disabled={!(name && amount)}
              onClick={onCreateIncomes}
              className="mt-5 w-full rounded-full"
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