export interface Project {
  id: string
  title: string
  description: string | null
  challenge?: string | null
  solution?: string | null
  tag?: string | null
  tag_color?: string | null
  metric_primary?: string | null
  metric_secondary?: string | null
  technologies: string[]
  url: string | null
  image_url: string | null
  is_featured: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface ProjectInput {
  title: string
  description?: string
  challenge?: string
  solution?: string
  tag?: string
  tag_color?: string
  metric_primary?: string
  metric_secondary?: string
  technologies: string[]
  url?: string
  image_url?: string
  is_featured: boolean
  sort_order: number
}

export interface ContactLead {
  id: string
  name: string
  email: string
  organization: string
  service: string | null
  budget: string | null
  details: string | null
  status: "new" | "contacted" | "closed"
  created_at: string
  updated_at: string
}

export interface SiteContent {
  id: string
  section_key: string
  content: Record<string, unknown>
  updated_at: string
}
