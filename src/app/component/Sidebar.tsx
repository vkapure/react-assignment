'use client'

import { useState } from 'react'
import {
  HomeIcon,
  CalendarDaysIcon,
  TableCellsIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DocumentIcon } from '@heroicons/react/24/outline'


export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Calendar', href: '/calendar', icon: CalendarDaysIcon },
    { name: 'Table', href: '/table', icon: TableCellsIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
    { name: 'Appeal Letter', href: '/appeal-letter', icon: DocumentIcon }

  ]

  return (
    <aside
      className={`bg-[#1F2937] text-white transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } h-screen flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        {!collapsed && <span className="text-lg font-semibold">Appeals</span>}
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? (
            <ChevronDoubleRightIcon className="h-5 w-5" />
          ) : (
            <ChevronDoubleLeftIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 space-y-2">
        {navItems.map(({ name, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-4 px-4 py-2 transition-all text-sm font-medium ${
                active ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span>{name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="px-4 py-4 border-t border-gray-700">
        <button className="flex items-center gap-3 text-sm hover:text-gray-300">
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
