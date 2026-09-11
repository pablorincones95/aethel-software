import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { LayoutDashboard, FolderKanban, FileText, Users } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: projectsCount },
    { count: contentCount },
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("site_content").select("*", { count: "exact", head: true }),
  ])

  const stats = [
    {
      title: "Projects",
      value: projectsCount ?? 0,
      icon: FolderKanban,
      color: "text-primary-container",
    },
    {
      title: "Content Sections",
      value: contentCount ?? 0,
      icon: FileText,
      color: "text-secondary",
    },
    {
      title: "Admin Users",
      value: 1,
      icon: Users,
      color: "text-tertiary",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="flex items-center gap-3 text-headline-lg text-text-ice">
          <LayoutDashboard className="h-6 w-6 text-primary-container" />
          Dashboard
        </h1>
        <p className="mt-1 text-body-md text-text-muted">
          System overview and management console.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-label-caps text-text-muted">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-headline-lg tabular-nums text-text-ice">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-label-caps text-text-muted">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <a
            href="/admin/projects"
            className="inline-flex h-9 items-center justify-center rounded-[4px] bg-primary-container px-4 text-sm font-semibold text-on-primary shadow-[0_0_16px_rgba(0,229,255,0.25)] transition-all hover:shadow-[0_0_24px_rgba(0,229,255,0.4)] hover:bg-primary"
          >
            Manage Projects
          </a>
          <a
            href="/admin/content"
            className="inline-flex h-9 items-center justify-center rounded-[4px] border border-border-gold bg-transparent px-4 text-sm font-medium text-secondary transition-colors hover:bg-secondary/5"
          >
            Edit Content
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
