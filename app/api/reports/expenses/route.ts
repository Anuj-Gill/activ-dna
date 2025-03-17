import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const merchantId = Number(searchParams.get('merchantId') || '1');

  // Get date range filters
  const startDate = searchParams.get('startDate')
    ? new Date(searchParams.get('startDate') as string)
    : new Date(new Date().setMonth(new Date().getMonth() - 1));

  const endDate = searchParams.get('endDate')
    ? new Date(searchParams.get('endDate') as string)
    : new Date();

  try {
    // Get expenses by category
    const expensesByCategory = await prisma.expense.groupBy({
      by: ['category'],
      _sum: {
        expenseAmount: true,
      },
      where: {
        merchantId,
        expenseDate: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Format data for pie chart
    const formattedData = expensesByCategory.map(item => ({
      category: item.category || 'Uncategorized',
      amount: item._sum.expenseAmount || 0,
    })).sort((a, b) => b.amount - a.amount);

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error fetching expense breakdown:', error);
    return NextResponse.json(
      { error: 'Failed to fetch expense breakdown' },
      { status: 500 }
    );
  }
}
