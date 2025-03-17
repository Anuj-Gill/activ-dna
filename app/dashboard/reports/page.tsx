'use client';

import React, { useState } from 'react';
import { useReports } from '@/hooks/useReports';
import { DateFilter } from '@/components/reports/date-filter';
import { FinancialSummary } from '@/components/reports/financial-summary';
import { RevenueChart } from '@/components/reports/revenue-chart';
import { ExpenseBreakdown } from '@/components/reports/expense-breakdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { subMonths } from 'date-fns';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Create a formatter utility
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function ReportsPage() {
  // In a real app, this would come from auth context or params
  const merchantId = 1;

  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subMonths(new Date(), 1),
    to: new Date(),
  });

  const { financialSummary, revenueGrowth, expenseBreakdown, isLoading, error } = useReports(merchantId, dateRange);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Financial Reports</h1>
        <DateFilter onDateChange={setDateRange} />
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <FinancialSummary
          data={financialSummary || { totalRevenue: 0, totalExpenses: 0, netProfit: 0, totalCustomers: 0 }}
          isLoading={isLoading}
        />

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <RevenueChart data={revenueGrowth} isLoading={isLoading} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ExpenseBreakdown data={expenseBreakdown} isLoading={isLoading} />

          <Card>
            <CardHeader>
              <CardTitle>Key Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2 animate-pulse">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-6 bg-gray-200 rounded"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue per Customer:</span>
                    <span className="font-medium">
                      {financialSummary?.totalCustomers > 0
                        ? formatter.format(financialSummary.totalRevenue / financialSummary.totalCustomers)
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Profit Margin:</span>
                    <span className="font-medium">
                      {financialSummary?.totalRevenue > 0
                        ? `${((financialSummary.netProfit / financialSummary.totalRevenue) * 100).toFixed(2)}%`
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expense Ratio:</span>
                    <span className="font-medium">
                      {financialSummary?.totalRevenue > 0
                        ? `${((financialSummary.totalExpenses / financialSummary.totalRevenue) * 100).toFixed(2)}%`
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Average Revenue:</span>
                    <span className="font-medium">
                      {revenueGrowth && revenueGrowth.length > 0
                        ? formatter.format(
                          revenueGrowth.reduce((sum, item) => sum + item.revenue, 0) / revenueGrowth.length
                        )
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
