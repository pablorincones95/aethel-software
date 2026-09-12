import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { LayoutDashboard, FolderKanban, FileText, Inbox } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  let projectsCount = 3
  let contentCount = 8
  let leadsCount = 0

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = await createClient()
      const [
        { count: pCount },
        { count: cCount },
        { count: lCount },
      ] = await Promise.all([
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("site_content").select("*", { count: "exact", head: true }),
        supabase.from("contact_leads").select("*", { count: "exact", head: true }),
      ])

      if (pCount !== null) projectsCount = pCount
      if (cCount !== null) contentCount = cCount
      if (lCount !== null) leadsCount = lCount
    } catch {
      // Use mock data
    }
  }

  const stats = [
    {
      title: "Proyectos / Casos",
      value: projectsCount,
      icon: FolderKanban,
      href: "/admin/projects",
    },
    {
      title: "Secciones CMS",
      value: contentCount,
      icon: FileText,
      href: "/admin/content",
    },
    {
      title: "Leads Recibidos",
      value: leadsCount,
      icon: Inbox,
      href: "/admin/leads",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="flex items-center gap-3 text-2xl font-bold">
          <LayoutDashboard className="h-6 w-6 text-[#00e5ff]" />
          Dashboard de Administración
        </h1>
        <p className="mt-1 text-muted-foreground">
          Consola central de supervisión, contenidos y portafolio de Aethel Software.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href} className="transition-transform hover:-translate-y-0.5">
            <Card className="hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Acciones Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Link href="/admin/projects">
            <Button>Gestionar Proyectos</Button>
          </Link>
          <Link href="/admin/content">
            <Button variant="outline">Editar Textos (CMS)</Button>
          </Link>
          <Link href="/admin/leads">
            <Button variant="outline">Ver Leads de Contacto</Button>
          </Link>
          <Link href="/" target="_blank">
            <Button variant="ghost">Ver Sitio Web ↗</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
