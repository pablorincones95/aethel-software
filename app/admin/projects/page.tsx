import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { FolderKanban } from "lucide-react"

export default async function AdminProjects() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="flex items-center gap-3 text-headline-lg text-text-ice">
            <FolderKanban className="h-6 w-6 text-primary-container" />
            Projects
          </h1>
          <p className="mt-1 text-body-md text-text-muted">
            Supabase not configured. Set environment variables to manage projects.
          </p>
        </div>
      </div>
    )
  }

  const supabase = await createClient()

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-headline-lg text-text-ice">
            <FolderKanban className="h-6 w-6 text-primary-container" />
            Projects
          </h1>
          <p className="mt-1 text-body-md text-text-muted">
            Manage your portfolio projects.
          </p>
        </div>
        <button className="inline-flex h-9 items-center justify-center rounded-[4px] bg-primary-container px-4 text-sm font-semibold text-on-primary shadow-[0_0_16px_rgba(0,229,255,0.25)] transition-all hover:shadow-[0_0_24px_rgba(0,229,255,0.4)] hover:bg-primary">
          Add Project
        </button>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-label-caps text-text-muted">
            All Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Technologies</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects && projects.length > 0 ? (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium text-text-ice">
                      {project.title}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies?.slice(0, 3).map((tech: string) => (
                          <Badge key={tech} variant="primary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={project.is_featured ? "secondary" : "outline"}>
                        {project.is_featured ? "Featured" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <button className="text-sm text-text-muted hover:text-primary-container">
                        Edit
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-text-muted">
                    No projects yet. Create your first project to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
