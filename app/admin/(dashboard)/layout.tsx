import { type Metadata } from "next"
import Link from "next/link"
import { cookies } from "next/headers"
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Inbox,
} from "lucide-react"
import { SignOutButton } from "./sign-out-button"
import { ThemeToggle } from "@/components/admin/theme-toggle"

export const metadata: Metadata = {
  title: "Admin — Aethel Software",
  description: "Aethel Software admin panel",
}

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Proyectos / Casos", href: "/admin/projects", icon: FolderKanban },
  { label: "Contenidos (CMS)", href: "/admin/content", icon: FileText },
  { label: "Leads & Contactos", href: "/admin/leads", icon: Inbox },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const userEmail = cookieStore.get("aethel_user")?.value || "admin@aethel.software"

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-background">
        {/* Logo */}
        <div className="flex h-14 items-center gap-2 border-b px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground text-sm font-bold">
            A
          </div>
          <div>
            <span className="text-sm font-semibold">Aethel</span>
            <span className="ml-1 text-xs text-muted-foreground">Admin</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User info + Sign out */}
        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                {userEmail.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 truncate">
                <p className="truncate text-sm font-medium">{userEmail}</p>
                <p className="text-xs text-muted-foreground">Administrador</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <SignOutButton />
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  )
}
