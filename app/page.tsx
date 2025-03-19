import React from 'react';
import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to the reports dashboard
  redirect('/dashboard/reports');
}
