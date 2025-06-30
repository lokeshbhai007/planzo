// utils/getFinancialAdvice.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Function to generate personalized financial advice
export const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend) => {
  console.log(totalBudget, totalIncome, totalSpend);
  
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const userPrompt = `
      Based on the following financial data:
      - Total Budget: ${totalBudget} Rupee 
      - Expenses: ${totalSpend} Rupee 
      - Incomes: ${totalIncome} Rupee
      Provide detailed financial advice in 3 sentence use easy english term to help the user manage their finances more effectively.
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