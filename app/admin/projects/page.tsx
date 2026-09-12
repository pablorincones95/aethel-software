import { FolderKanban } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { ProjectsClient } from "@/components/admin/projects-client"
import type { Project } from "@/lib/types"

const mockProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory",
    technologies: ["Next.js", "TypeScript", "Supabase", "Stripe"],
    url: "https://example.com",
    image_url: null,
    is_featured: true,
    sort_order: 1,
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    title: "Analytics Dashboard",
    description: "Real-time analytics dashboard with data visualization",
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL"],
    url: "https://example.com",
    image_url: null,
    is_featured: false,
    sort_order: 2,
    created_at: "2024-02-20T00:00:00Z",
    updated_at: "2024-02-20T00:00:00Z",
  },
  {
    id: "3",
    title: "Mobile Banking App",
    description: "Secure mobile banking application with biometric auth",
    technologies: ["React Native", "TypeScript", "Node.js"],
    url: null,
    image_url: null,
    is_featured: true,
    sort_order: 3,
    created_at: "2024-03-10T00:00:00Z",
    updated_at: "2024-03-10T00:00:00Z",
  },
]

export default async function AdminProjects() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  let projects: Project[] = mockProjects

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = await createClient()
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true })

      if (data) {
        projects = data
      }
    } catch {
      // Use mock data
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="flex items-center gap-3 text-2xl font-bold">
          <FolderKanban className="h-6 w-6" />
          Projects
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your portfolio projects.
        </p>
      </div>

      <ProjectsClient projects={projects} />
    </div>
  )
}
