import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Customers
  const customers = [
    { name: 'Alice Johnson', email: 'alice@example.com' },
    { name: 'Bob Smith', email: 'bob@example.com' },
    { name: 'Charlie Brown', email: 'charlie@example.com' },
    { name: 'Diana Prince', email: 'diana@example.com' },
    { name: 'Edward Cullen', email: 'edward@example.com' },
    { name: 'Fiona Gallagher', email: 'fiona@example.com' },
    { name: 'George Michael', email: 'george@example.com' },
    { name: 'Hannah Montana', email: 'hannah@example.com' },
    { name: 'Ian Gallagher', email: 'ian@example.com' },
    { name: 'Julia Roberts', email: 'julia@example.com' }
  ];

  // Create Merchants
  const merchants = [
    { name: 'Coffee Corner', email: 'info@coffeecorner.com' },
    { name: 'Tasty Treats', email: 'orders@tastytreats.com' },
    { name: 'Tech Hub', email: 'sales@techhub.com' },
    { name: 'Fitness First', email: 'members@fitnessfirst.com' },
    { name: 'Books & Beyond', email: 'support@booksbeyond.com' },
    { name: 'Green Grocers', email: 'hello@greengrocers.com' },
    { name: 'Fashion Forward', email: 'style@fashionforward.com' },
    { name: 'Home Essentials', email: 'care@homeessentials.com' }
  ];

  // Create customers in the database
  const createdCustomers = [];
  for (const customer of customers) {
    const createdCustomer = await prisma.customer.create({
      data: customer
    });
    createdCustomers.push(createdCustomer);
    console.log(`Created customer: ${createdCustomer.name}`);
  }

  // Create merchants in the database
  const createdMerchants = [];
  for (const merchant of merchants) {
    const createdMerchant = await prisma.merchant.create({
      data: merchant
    });
    createdMerchants.push(createdMerchant);
    console.log(`Created merchant: ${createdMerchant.name}`);
  }

  // Create payments
  const payments = [];
  // Generate 100 random payments
  for (let i = 0; i < 100; i++) {
    const randomCustomer = createdCustomers[Math.floor(Math.random() * createdCustomers.length)];
    const randomMerchant = createdMerchants[Math.floor(Math.random() * createdMerchants.length)];
    const paymentAmount = parseFloat((Math.random() * 200 + 5).toFixed(2));

    // Generate a random date within the last 6 months
    const paymentDate = new Date();
    paymentDate.setMonth(paymentDate.getMonth() - Math.floor(Math.random() * 6));
    paymentDate.setDate(Math.floor(Math.random() * 28) + 1); // Avoid invalid dates

    payments.push({
      customerId: randomCustomer.id,
      merchantId: randomMerchant.id,
      paymentAmount,
      paymentDate
    });
  }

  // Create payments in the database
  for (const payment of payments) {
    await prisma.payment.create({
      data: payment
    });
  }
  console.log(`Created ${payments.length} payments`);

  // Create expenses
  const expenseCategories = [
    'Inventory', 'Rent', 'Utilities', 'Salaries', 'Marketing',
    'Equipment', 'Software', 'Insurance', 'Taxes', 'Miscellaneous'
  ];

  const expenses = [];
  // Generate 150 random expenses
  for (let i = 0; i < 150; i++) {
    const randomMerchant = createdMerchants[Math.floor(Math.random() * createdMerchants.length)];
    const expenseAmount = parseFloat((Math.random() * 1000 + 50).toFixed(2));
    const category = expenseCategories[Math.floor(Math.random() * expenseCategories.length)];

    // Generate a random date within the last year
    const expenseDate = new Date();
    expenseDate.setMonth(expenseDate.getMonth() - Math.floor(Math.random() * 12));
    expenseDate.setDate(Math.floor(Math.random() * 28) + 1); // Avoid invalid dates

    // Generate a description based on the category
    let description;
    switch (category) {
      case 'Inventory':
        description = `Restocking ${['products', 'supplies', 'materials'][Math.floor(Math.random() * 3)]}`;
        break;
      case 'Rent':
        description = `Monthly rent payment for ${['main location', 'warehouse', 'office space'][Math.floor(Math.random() * 3)]}`;
        break;
      case 'Utilities':
        description = `${['Electricity', 'Water', 'Internet', 'Phone'][Math.floor(Math.random() * 4)]} bill`;
        break;
      case 'Salaries':
        description = `Employee salaries for ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][expenseDate.getMonth()]}`;
        break;
      case 'Marketing':
        description = `${['Social media', 'Print', 'Digital', 'Event'][Math.floor(Math.random() * 4)]} marketing campaign`;
        break;
      default:
        description = `${category} expense`;
    }

    expenses.push({
      merchantId: randomMerchant.id,
      expenseAmount,
      expenseDate,
      category,
      description
    });
  }

  // Create expenses in the database
  for (const expense of expenses) {
    await prisma.expense.create({
      data: expense
    });
  }
  console.log(`Created ${expenses.length} expenses`);

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
