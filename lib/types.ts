export interface Project {
  id: string
  title: string
  description: string | null
  technologies: string[]
  url: string | null
  image_url: string | null
  is_featured: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface SiteContent {
  id: string
  section_key: string
  content: Record<string, unknown>
  updated_at: string
}

export interface ProjectInput {
  title: string
  description?: string
  technologies: string[]
  url?: string
  image_url?: string
  is_featured: boolean
  sort_order: number
}
