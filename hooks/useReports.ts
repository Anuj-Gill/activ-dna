import { useState, useEffect } from 'react';

export function useReports(merchantId: number, dateRange: { from: Date; to: Date }) {
  const [financialSummary, setFinancialSummary] = useState<any>(null);
  const [revenueGrowth, setRevenueGrowth] = useState<any[]>([]);
  const [expenseBreakdown, setExpenseBreakdown] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Prepare date params
        const startDate = dateRange.from.toISOString();
        const endDate = dateRange.to.toISOString();

        // Financial summary
        const summaryResponse = await fetch(
          `/api/reports/financial-summary?merchantId=${merchantId}&startDate=${startDate}&endDate=${endDate}`
        );

        if (!summaryResponse.ok) {
          throw new Error('Failed to fetch financial summary');
        }

        const summaryData = await summaryResponse.json();
        setFinancialSummary(summaryData);

        // Revenue growth
        const growthResponse = await fetch(
          `/api/reports/revenue-growth?merchantId=${merchantId}&months=6`
        );

        if (!growthResponse.ok) {
          throw new Error('Failed to fetch revenue growth data');
        }

        const growthData = await growthResponse.json();
        setRevenueGrowth(growthData);

        // Expense breakdown
        const expenseResponse = await fetch(
          `/api/reports/expenses?merchantId=${merchantId}&startDate=${startDate}&endDate=${endDate}`
        );

        if (!expenseResponse.ok) {
          throw new Error('Failed to fetch expense breakdown');
        }

        const expenseData = await expenseResponse.json();
        setExpenseBreakdown(expenseData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching reports data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [merchantId, dateRange]);

  return {
    financialSummary,
    revenueGrowth,
    expenseBreakdown,
    isLoading,
    error
  };
}
