'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart,
  Users,
  CreditCard,
  Settings,
  Menu,
  ChevronLeft,
  Home,
  Calendar,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const items: SidebarItem[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
    },
    {
      name: 'Reports',
      href: '/dashboard/reports',
      icon: BarChart,
    },
    {
      name: 'Customers',
      href: '/dashboard/customers',
      icon: Users,
    },
    {
      name: 'Payments',
      href: '/dashboard/payments',
      icon: CreditCard,
    },
    {
      name: 'Schedule',
      href: '/dashboard/schedule',
      icon: Calendar,
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
    },
    {
      name: 'Help',
      href: '/dashboard/help',
      icon: HelpCircle,
    },
  ];

  return (
    <div
      className={cn(
        'bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="h-16 flex items-center px-4 border-b border-gray-200 justify-between">
        {!collapsed && (
          <Link href="/dashboard" className="font-bold text-xl">
            FitStudio
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <nav className="flex-1 py-4 px-2 space-y-1">
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
              pathname === item.href
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            )}
          >
            <item.icon className={cn('h-5 w-5', collapsed ? 'mx-auto' : 'mr-3')} />
            {!collapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}
