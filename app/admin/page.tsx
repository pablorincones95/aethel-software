import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { LayoutDashboard, FolderKanban, FileText, Users } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  let projectsCount = 3
  let contentCount = 4

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = await createClient()
      const [
        { count: pCount },
        { count: cCount },
      ] = await Promise.all([
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("site_content").select("*", { count: "exact", head: true }),
      ])

      if (pCount !== null) projectsCount = pCount
      if (cCount !== null) contentCount = cCount
    } catch {
      // Use mock data
    }
  }

  const stats = [
    {
      title: "Projects",
      value: projectsCount,
      icon: FolderKanban,
    },
    {
      title: "Content Sections",
      value: contentCount,
      icon: FileText,
    },
    {
      title: "Admin Users",
      value: 1,
      icon: Users,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="flex items-center gap-3 text-2xl font-bold">
          <LayoutDashboard className="h-6 w-6" />
          Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          System overview and management console.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Link href="/admin/projects">
            <Button>Manage Projects</Button>
          </Link>
          <Link href="/admin/content">
            <Button variant="outline">Edit Content</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
