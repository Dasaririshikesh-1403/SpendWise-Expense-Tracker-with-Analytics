import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1977', '#19FFEE'];

const MonthlySummaryChart = ({ summaryData }) => {
  if (!summaryData || summaryData.length === 0) {
    return <p>No expense data for this month to display a chart.</p>;
  }

  const totalAmount = summaryData.reduce((acc, item) => acc + item.totalAmount, 0);

  
  const dataWithPercentage = summaryData.map(item => ({
    ...item,
    percentage: ((item.totalAmount / totalAmount) * 100).toFixed(2),
  }));

  return (
    <div className="card chart-card">
      <h3>Monthly Expense Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dataWithPercentage}
            dataKey="totalAmount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          >
            {dataWithPercentage.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name, props) => [`$${value.toFixed(2)}`, `${props.payload.category} (${props.payload.percentage}%)`]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySummaryChart;