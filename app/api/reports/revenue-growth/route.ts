import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const merchantId = Number(searchParams.get('merchantId') || '1');

  // Get last 6 months data by default
  const months = Number(searchParams.get('months') || '6');

  // Calculate date range
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - months);

  try {
    // Get monthly revenue data
    const monthlyRevenue = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', "paymentDate") as month,
        SUM("paymentAmount") as revenue
      FROM "Payment"
      WHERE 
        "merchantId" = ${merchantId} AND
        "paymentDate" >= ${startDate} AND
        "paymentDate" <= ${endDate}
      GROUP BY DATE_TRUNC('month', "paymentDate")
      ORDER BY month ASC
    `;

    // Get monthly expenses data
    const monthlyExpenses = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', "expenseDate") as month,
        SUM("expenseAmount") as expenses
      FROM "Expense"
      WHERE 
        "merchantId" = ${merchantId} AND
        "expenseDate" >= ${startDate} AND
        "expenseDate" <= ${endDate}
      GROUP BY DATE_TRUNC('month', "expenseDate")
      ORDER BY month ASC
    `;

    // Combine and format data
    const allMonths = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      allMonths.push(new Date(currentDate));
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    const formattedData = allMonths.map(date => {
      const monthStr = date.toISOString().substring(0, 7);

      const revenueEntry = (monthlyRevenue as any[]).find(
        entry => entry.month.toISOString().substring(0, 7) === monthStr
      );

      const expenseEntry = (monthlyExpenses as any[]).find(
        entry => entry.month.toISOString().substring(0, 7) === monthStr
      );

      const revenue = revenueEntry ? Number(revenueEntry.revenue) : 0;
      const expenses = expenseEntry ? Number(expenseEntry.expenses) : 0;

      return {
        month: monthStr,
        revenue,
        expenses,
        profit: revenue - expenses
      };
    });

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error fetching revenue growth data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch revenue growth data' },
      { status: 500 }
    );
  }
}
