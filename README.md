# FitStudio Financial Dashboard

## Overview

FitStudio Financial Dashboard is a Next.js web application that provides fitness studio owners with detailed financial reports and analytics. The dashboard displays key financial metrics including revenue, expenses, profit margins, and customer data, allowing business owners to make data-driven decisions.

## Features

### Financial Summary
- **Total Revenue**: Sum of all payments received during the selected period
- **Total Expenses**: Sum of all expenses during the selected period
- **Net Profit**: Calculated as Total Revenue - Total Expenses
- **Total Customers**: Count of unique customers who made payments during the selected period

### Revenue Growth
- Interactive line chart showing revenue, expenses, and profit trends over time
- Monthly breakdown for the past 6 months by default
- Visual indication of financial trajectory

![image](https://github.com/user-attachments/assets/5a52113f-e12c-4739-8189-f7ba13878f19)

### Expense Breakdown
- Pie chart visualization showing expenses by category
- Percentage breakdown of different expense types
- Clear color coding for easy identification

### Key Metrics
- **Revenue per Customer**: Average revenue generated per customer
- **Profit Margin**: Net profit as a percentage of total revenue
- **Expense Ratio**: Expenses as a percentage of total revenue
- **Monthly Average Revenue**: Average monthly revenue over the selected period

![image](https://github.com/user-attachments/assets/dbb00564-912c-4b8d-8131-aa10671c72fc)


### Flexible Date Filtering
- Custom date range selection with calendar picker
- Preset options (Last 30 Days, Last 3 Months, Last 6 Months, Year to Date)
- Data automatically refreshes when date range is changed

![image](https://github.com/user-attachments/assets/5cfa57b6-8e90-4e67-94dc-53a635e71ee3)



## Technical Implementation

### Frontend
- Built with Next.js (App Router) and React
- Responsive UI with Tailwind CSS
- Interactive components using shadcn/ui component library
- Data visualization with Recharts for charts and graphs

### Backend
- API routes to fetch financial data
- Database queries using Prisma ORM
- Aggregation of financial metrics
- Date range filtering

### Key Components

#### API Routes
- `/api/reports/financial-summary`: Fetches summary metrics (revenue, expenses, profit, customers)
- `/api/reports/revenue-growth`: Retrieves monthly financial data for charting
- `/api/reports/expenses`: Gets expense breakdown by category

#### UI Components
- `FinancialSummary`: Top-level cards showing main financial metrics
- `RevenueChart`: Line chart for visualizing revenue growth
- `ExpenseBreakdown`: Pie chart showing expense distribution
- `DateFilter`: Date range selector with presets

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- PostgreSQL database

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/fitstudio"
   ```
4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
6. You can use the ./utils/seed.js file to seed the db with some sample data
   
5. Start the development server:
   ```bash
   npm run dev
   ```
