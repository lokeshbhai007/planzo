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

  return (
    <div className="border rounded-2xl p-5">
      <h2 className="font-bold text-lg">Activity</h2>
      <ResponsiveContainer width={"90%"} height={300}>
        <BarChart
          data={chartData}
          margin={{
            top: 7,
          }}
        >
          <XAxis dataKey="name" hide />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Option 1: Side by side bars */}
          {/* <Bar dataKey="totalSpend" fill="#4845d2" name="Total Spent" />
          <Bar dataKey="amount" fill="#C3C2FF" name="Budget Amount" /> */}
                     
          {/* Option 2: Stacked bars showing spent vs remaining (uncomment to use) */}
          <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" name="Spent" />
          <Bar dataKey="remaining" stackId="a" fill="#C3C2FF" name="Remaining" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;