import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // ✅ Ensure correct import path
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

export default function FinancialReport() {
  // Sample data
  const financialSummary = {
    totalRevenue: 125000,
    totalExpenses: 75000,
    netProfit: 50000,
    totalCustomers: 320
  };

  const revenueGrowth = [
    { month: 'Jan', revenue: 18000, expenses: 12000, profit: 6000 },
    { month: 'Feb', revenue: 19500, expenses: 13000, profit: 6500 },
    { month: 'Mar', revenue: 21000, expenses: 12500, profit: 8500 },
    { month: 'Apr', revenue: 20000, expenses: 12800, profit: 7200 },
    { month: 'May', revenue: 22500, expenses: 13200, profit: 9300 },
    { month: 'Jun', revenue: 24000, expenses: 13500, profit: 10500 }
  ];

  const expenseBreakdown = [
    { category: 'Rent', amount: 30000 },
    { category: 'Salaries', amount: 25000 },
    { category: 'Equipment', amount: 10000 },
    { category: 'Marketing', amount: 5000 },
    { category: 'Utilities', amount: 3000 },
    { category: 'Other', amount: 2000 }
  ];

  // Format currency
  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Chart data
  const chartData = revenueGrowth.map(item => ({
    name: item.month,
    Revenue: item.revenue,
    Expenses: item.expenses,
    Profit: item.profit
  }));

  // Pie chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Financial Reports</h1>
        <div className="flex items-center space-x-2">
          <select className="p-2 border rounded">
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
            <option>Year to Date</option>
          </select>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(financialSummary.totalRevenue)}</div>
            <p className="text-xs text-gray-500">All time payments received</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(financialSummary.totalExpenses)}</div>
            <p className="text-xs text-gray-500">All expenses combined</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(financialSummary.netProfit)}</div>
            <p className="text-xs text-gray-500">{`${Math.abs((financialSummary.netProfit / financialSummary.totalRevenue) * 100).toFixed(1)}% margin`}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{financialSummary.totalCustomers}</div>
            <p className="text-xs text-gray-500">Active in selected period</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Growth Chart */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Line type="monotone" dataKey="Revenue" stroke="#22c55e" strokeWidth={2} />
                  <Line type="monotone" dataKey="Expenses" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="Profit" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                    nameKey="category"
                    label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Revenue per Customer:</span>
                <span className="font-medium">
                  {formatCurrency(financialSummary.totalRevenue / financialSummary.totalCustomers)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Profit Margin:</span>
                <span className="font-medium">
                  {`${((financialSummary.netProfit / financialSummary.totalRevenue) * 100).toFixed(2)}%`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Expense Ratio:</span>
                <span className="font-medium">
                  {`${((financialSummary.totalExpenses / financialSummary.totalRevenue) * 100).toFixed(2)}%`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Monthly Average Revenue:</span>
                <span className="font-medium">
                  {formatCurrency(
                    revenueGrowth.reduce((sum, item) => sum + item.revenue, 0) / revenueGrowth.length
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

