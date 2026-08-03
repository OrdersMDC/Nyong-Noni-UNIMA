'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Newspaper,
  Image,
  Calendar,
  Crown,
  Trophy,
  Award,
  Star,
  Handshake,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

const SIDEBAR_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Applicants', href: '/admin/applicants', icon: Users },
  { label: 'Finalists', href: '/admin/finalists', icon: UserCheck },
  { label: 'Titleholders', href: '/admin/titleholders', icon: Crown },
  { label: 'Hall of Fame', href: '/admin/hall-of-fame', icon: Trophy },
  { label: 'Alumni Achievements', href: '/admin/alumni-achievements', icon: Award },
  { label: 'News', href: '/admin/news', icon: Newspaper },
  { label: 'Gallery', href: '/admin/gallery', icon: Image },
  { label: 'Events', href: '/admin/events', icon: Calendar },
  { label: 'Current Titleholders', href: '/admin/current-titleholders', icon: Star },
  { label: 'Sponsors', href: '/admin/sponsors', icon: Handshake },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[#E2E8F0] bg-white transition-transform duration-200 lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#E2E8F0] px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-xs font-bold text-[#003DA5]">
              NN
            </div>
            <span className="text-sm font-semibold text-[#003DA5]">Nyong Noni</span>
          </Link>
          <button
            className="text-[#6B7280] hover:text-[#1A1A1A] lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[#003DA5] text-white'
                    : 'text-[#6B7280] hover:bg-[#F8F9FA] hover:text-[#1A1A1A]',
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="shrink-0 border-t border-[#E2E8F0] p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#6B7280] transition-colors hover:bg-[#F8F9FA] hover:text-[#1A1A1A]"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Logout
          </button>
          <Link
            href="/"
            className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-[#6B7280] transition-colors hover:bg-[#F8F9FA] hover:text-[#1A1A1A]"
          >
            &larr; Back to Website
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#E2E8F0] bg-white px-6">
          <div className="flex items-center gap-3">
            <button
              className="text-[#6B7280] hover:text-[#1A1A1A] lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-xs font-medium uppercase tracking-widest text-[#6B7280]">
              Nyong Noni UNIMA Admin
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
