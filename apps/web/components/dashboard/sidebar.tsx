"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Bot,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/dashboard/groups",
    label: "Communities",
    icon: Users,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* ─── Mobile Header (Top) ─────────────────────────────────── */}
      <header className="md:hidden sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-orange-500 flex items-center justify-center shadow-sm">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-white text-base">TribeOS</span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 px-2.5 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
          title="Sign out"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Exit</span>
        </button>
      </header>

      {/* ─── Mobile Bottom Navigation Bar ────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 border-t border-zinc-800/90 bg-zinc-950/95 backdrop-blur-xl flex items-center justify-around px-3 pb-safe shadow-2xl">
        {navItems.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-all duration-150",
                active
                  ? "text-orange-500 font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              <item.icon className={cn("h-5 w-5", active ? "text-orange-500" : "text-zinc-400")} />
              <span className="text-[11px] leading-none tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ─── Desktop Sidebar (Left) ──────────────────────────────── */}
      <aside className="hidden md:flex h-screen sticky top-0 w-64 flex-col border-r border-zinc-800/80 bg-zinc-950 shrink-0">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2.5 px-6 border-b border-zinc-800/80">
          <div className="h-8 w-8 rounded-lg bg-orange-500 flex items-center justify-center shadow-sm">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">TribeOS</span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                  active
                    ? "bg-zinc-900 text-orange-400 border border-zinc-800 shadow-sm"
                    : "text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-100"
                )}
              >
                <item.icon className={cn("h-4 w-4", active ? "text-orange-400" : "text-zinc-400")} />
                <span>{item.label}</span>
                {active && <ChevronRight className="ml-auto h-3.5 w-3.5 text-orange-400/70" />}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Sign out */}
        <div className="border-t border-zinc-800/80 p-3">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-100 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
