import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Users, DollarSign, Wallet } from 'lucide-react';

interface FinancialSummaryProps {
  data: {
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
    totalCustomers: number;
  };
  isLoading: boolean;
}

export function FinancialSummary({ data, isLoading }: FinancialSummaryProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300 bg-gray-200 h-4 w-20 rounded"></CardTitle>
              <div className="h-8 w-8 rounded-full bg-gray-200"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gray-200 h-6 w-24 rounded"></div>
              <p className="text-xs text-muted-foreground bg-gray-200 h-3 w-16 mt-2 rounded"></p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const { totalRevenue, totalExpenses, netProfit, totalCustomers } = data;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const cards = [
    {
      title: 'Total Revenue',
      value: formatter.format(totalRevenue),
      icon: <DollarSign className="h-4 w-4" />,
      iconColor: 'text-emerald-500',
      description: 'All time payments received',
    },
    {
      title: 'Total Expenses',
      value: formatter.format(totalExpenses),
      icon: <Wallet className="h-4 w-4" />,
      iconColor: 'text-rose-500',
      description: 'All expenses combined',
    },
    {
      title: 'Net Profit',
      value: formatter.format(netProfit),
      icon: netProfit >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />,
      iconColor: netProfit >= 0 ? 'text-emerald-500' : 'text-rose-500',
      description: `${Math.abs((netProfit / totalRevenue) * 100).toFixed(1)}% margin`,
    },
    {
      title: 'Total Customers',
      value: totalCustomers.toString(),
      icon: <Users className="h-4 w-4" />,
      iconColor: 'text-blue-500',
      description: 'Active in selected period',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <div className={`rounded-full p-2 ${card.iconColor} bg-opacity-10`}>
              {card.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
