import { type Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Admin — Aethel Software",
  description: "Aethel Software admin panel",
}

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Content", href: "/admin/content" },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    redirect("/")
  }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen bg-canvas-void">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 w-64 border-r border-border-subtle bg-surface-container-low backdrop-blur-xl">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-border-subtle px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-primary-container">
            <span className="font-[family-name:var(--font-display)] text-sm font-bold text-on-primary">
              A
            </span>
          </div>
          <div>
            <span className="font-[family-name:var(--font-display)] text-sm font-semibold text-text-ice">
              Aethel
            </span>
            <span className="ml-1 text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
              Admin
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center rounded-[4px] px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-surface-container-high hover:text-text-ice"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User info */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border-subtle p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-container/10 text-xs font-medium text-primary-container">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 truncate">
              <p className="truncate text-sm font-medium text-text-ice">
                {user.email}
              </p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  )
}
