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
    // Get total revenue
    const totalRevenue = await prisma.payment.aggregate({
      _sum: {
        paymentAmount: true,
      },
      where: {
        merchantId,
        paymentDate: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Get total expenses
    const totalExpenses = await prisma.expense.aggregate({
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

    // Get total customers
    const totalCustomers = await prisma.payment.groupBy({
      by: ['customerId'],
      where: {
        merchantId,
        paymentDate: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Calculate net profit
    const revenue = totalRevenue._sum.paymentAmount || 0;
    const expenses = totalExpenses._sum.expenseAmount || 0;
    const netProfit = revenue - expenses;

    return NextResponse.json({
      totalRevenue: revenue,
      totalExpenses: expenses,
      netProfit,
      totalCustomers: totalCustomers.length,
      startDate,
      endDate,
    });
  } catch (error) {
    console.error('Error fetching financial summary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch financial summary' },
      { status: 500 }
    );
  }
}
