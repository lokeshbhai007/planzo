import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarChartDashboard({ budgetList }) {
  // Transform data to show remaining budget vs spent
  const chartData = budgetList.map(budget => ({
    ...budget,
    remaining: Math.max(0, budget.amount - (budget.totalSpend || 0))
  }));

  // Custom tooltip component for dark mode
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-gray-800 dark:text-gray-100 font-medium">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ₹${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 bg-white dark:bg-gray-800 transition-colors duration-300">
      <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">
        Activity
      </h2>
      <ResponsiveContainer width={"90%"} height={300}>
        <BarChart
          data={chartData}
          margin={{
            top: 7,
          }}
        >
          <XAxis 
            dataKey="name" 
            hide 
            tick={{ fill: 'currentColor' }}
            className="text-gray-600 dark:text-gray-400"
          />
          <YAxis 
            tick={{ fill: 'currentColor' }}
            className="text-gray-600 dark:text-gray-400"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ 
              color: 'currentColor' 
            }}
            className="text-gray-600 dark:text-gray-400"
          />
          {/* Option 1: Side by side bars */}
          {/* <Bar dataKey="totalSpend" fill="#3b82f6" name="Total Spent" />
          <Bar dataKey="amount" fill="#93c5fd" name="Budget Amount" /> */}
                     
          {/* Option 2: Stacked bars showing spent vs remaining */}
          <Bar 
            dataKey="totalSpend" 
            stackId="a" 
            fill="#3b82f6" 
            name="Spent"
            className="hover:opacity-80 transition-opacity"
          />
          <Bar 
            dataKey="remaining" 
            stackId="a" 
            fill="#93c5fd" 
            name="Remaining"
            className="hover:opacity-80 transition-opacity"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;