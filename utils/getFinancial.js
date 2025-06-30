// utils/getFinancialAdvice.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Function to generate personalized financial advice
export const getFinancialAdvice = async (
  totalBudget,
  totalIncome,
  totalSpend
) => {
  console.log(totalBudget, totalIncome, totalSpend);

  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const userPrompt = `
  You are a smart and friendly financial advisor. Based on the following data:
  - Total Budget: ${totalBudget} Rupees  
  - Total Expenses: ${totalSpend} Rupees  
  - Total Income: ${totalIncome} Rupees  

  Give practical financial advice in **simple English**. Your answer must:
  - Be exactly **3 clear sentences**
  - Include helpful suggestions on **how much to save** (ideal amount or percentage)
  - Mention a safe **spending limit** based on the income
  - Encourage good money habits (like saving, tracking, or prioritizing needs)

  Make it sound supportive and realistic, like you're guiding a beginner to manage money better.
`;

    // Generate content using Gemini
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const advice = response.text();

    console.log(advice);
    return advice;
  } catch (error) {
    console.error("Error fetching financial advice:", error);
    return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
  }
};
